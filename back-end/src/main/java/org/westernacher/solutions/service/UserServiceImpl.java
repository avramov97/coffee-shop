package org.westernacher.solutions.service;

import org.modelmapper.ModelMapper;
import org.springframework.security.core.parameters.P;
import org.westernacher.solutions.domain.entities.User;
import org.westernacher.solutions.domain.entities.UserRole;
import org.westernacher.solutions.domain.models.binding.UserEditBindingModel;
import org.westernacher.solutions.domain.models.binding.UserRoleFactory;
import org.westernacher.solutions.domain.models.service.UserServiceModel;
import org.westernacher.solutions.repository.OrdersRepository;
import org.westernacher.solutions.repository.RoleRepository;
import org.westernacher.solutions.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final ModelMapper modelMapper;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final UserRoleService userRoleService;
    private final UserRoleFactory userRoleFactory;
    private final OrdersRepository ordersRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, RoleRepository roleRepository, ModelMapper modelMapper, BCryptPasswordEncoder bCryptPasswordEncoder, UserRoleService userRoleService, UserRoleFactory userRoleFactory, OrdersRepository ordersRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.modelMapper = modelMapper;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.userRoleService = userRoleService;
        this.userRoleFactory = userRoleFactory;
        this.ordersRepository = ordersRepository;
    }

    private Set<UserRole> getAuthorities(String authority) {
        Set<UserRole> userAuthorities = new HashSet<>();

        userAuthorities.add(this.roleRepository.getByAuthority(authority));

        return userAuthorities;
    }

    @Override
    public String getUserAuthority(String userId) {
        String authority = null;

        Optional<User> userOptional = this.userRepository.findById(userId);

        if (userOptional.isPresent()) {
            Set<UserRole> authorities = userOptional.get().getAuthorities();

            if (authorities.stream().anyMatch(o -> o.getAuthority().equalsIgnoreCase("ROOT-ADMIN"))) {
                authority = "ROOT-ADMIN";
            } else if (authorities.stream().anyMatch(o -> o.getAuthority().equalsIgnoreCase("ADMIN"))) {
                authority = "ADMIN";
            } else if (authorities.stream().anyMatch(o -> o.getAuthority().equalsIgnoreCase("MODERATOR"))) {
                authority = "MODERATOR";
            } else if (authorities.stream().anyMatch(o -> o.getAuthority().equalsIgnoreCase("ROLE_USER"))) {
                authority = "ROLE_USER";
            }
        }

        return authority;
    }

    @Override
    public boolean createUser(UserServiceModel userServiceModel) {
        User userEntity = this.modelMapper.map(userServiceModel, User.class);

        userEntity.setPassword(this.bCryptPasswordEncoder.encode(userEntity.getPassword()));

        Set<UserRole> authorities = new HashSet<>();

        if (this.userRepository.findAll().isEmpty()) {
            authorities.add(userRoleFactory.createUserRole("ROOT-ADMIN"));
            authorities.add(userRoleFactory.createUserRole("ADMIN"));
            authorities.add(userRoleFactory.createUserRole("MODERATOR"));
            authorities.add(userRoleFactory.createUserRole("ROLE_USER"));
        } else {
            authorities.add(this.userRoleService.findRole("ROLE_USER"));
        }

        userEntity.setAuthorities(authorities);

        try {
            this.userRepository.save(userEntity);
            return true;
        } catch (DataIntegrityViolationException e) {
            System.out.println("Username already exist");
            return false;
        }
    }

    @Override
    public boolean editUser(UserEditBindingModel userEditBindingModel) {
        Optional<User> foundUser = this.userRepository.findByUsername(userEditBindingModel.getUsername());

        if (foundUser.isPresent()) {
            foundUser.get().setFirstName(userEditBindingModel.getFirstName());
            foundUser.get().setLastName(userEditBindingModel.getLastName());
            foundUser.get().setEmail(userEditBindingModel.getEmail());
            foundUser.get().setBirthDate(userEditBindingModel.getBirthDate());

            this.userRepository.save(foundUser.get());

            return true;
        } else {
            return false;
        }
    }

    @Override
    public boolean deleteUser(String username) {
        User user = (User) loadUserByUsername(username);
        user.setAuthorities(null);

        try {
            this.userRepository.delete(user);
        } catch (DataIntegrityViolationException dataIntegrityViolationException) {
            return false;
        }

        return true;
    }

    @Override
    public Set<UserServiceModel> getAll() {
        return this.userRepository
                .findAll()
                .stream()
                .map(x -> this.modelMapper.map(x, UserServiceModel.class))
                .collect(Collectors.toUnmodifiableSet());
    }

    @Override
    public boolean promoteUser(String id) {
        User user = this.userRepository
                .findById(id)
                .orElse(null);

        if (user == null) {
            return false;
        }

        String userAuthority = this.getUserAuthority(user.getId());
        System.out.println("BEFORE PROMOTE USER AUTHORITY: " + userAuthority);
        Set<UserRole> authorities = new HashSet<>();

        switch (userAuthority) {
            case "ROLE_USER":
                authorities.add(userRoleService.findRole("MODERATOR"));
                authorities.add(userRoleService.findRole("ROLE_USER"));
                user.setAuthorities(authorities);
                break;
            case "MODERATOR":
                authorities.add(userRoleService.findRole("ADMIN"));
                authorities.add(userRoleService.findRole("MODERATOR"));
                authorities.add(userRoleService.findRole("ROLE_USER"));
                user.setAuthorities(authorities);
                break;
            default:
                throw new IllegalArgumentException("There is no role, higher than ADMIN");
        }
        this.userRepository.save(user);
        return true;
    }

    @Override
    public boolean demoteUser(String id) {
        User user = this.userRepository
                .findById(id)
                .orElse(null);

        if(user == null) {
            return false;
        }

        String userAuthority = this.getUserAuthority(user.getId());
        System.out.println("USER BEFORE DEMOTE AUTHORITY: " + userAuthority);
        Set<UserRole> authorities = new HashSet<>();

        switch (userAuthority) {
//            case "ROOT-ADMIN":
//                authorities.add(userRoleService.findRole("ADMIN"));
//                authorities.add(userRoleService.findRole("MODERATOR"));
//                authorities.add(userRoleService.findRole("ROLE_USER"));
//                user.setAuthorities(authorities);
//              user.setAuthorities(this.getAuthorities("ADMIN"));
//                break;
            case "ADMIN":
                authorities.add(userRoleService.findRole("MODERATOR"));
                authorities.add(userRoleService.findRole("ROLE_USER"));
                user.setAuthorities(authorities);
//                user.setAuthorities(this.getAuthorities("MODERATOR"));
                break;
            case "MODERATOR":
                authorities.add(userRoleService.findRole("ROLE_USER"));
                user.setAuthorities(authorities);
//                user.setAuthorities(this.getAuthorities("ROLE_USER"));
                break;
            default:
                throw new IllegalArgumentException("There is no role, lower than ROLE_USER");
        }
        System.out.println("AFTER DEMOTE USER AUTHORITY: " + this.getUserAuthority(user.getId()));
        this.userRepository.save(user);
        return true;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = this.userRepository
                .findByUsername(username)
                .orElse(null);

        if (user == null) {
            throw new UsernameNotFoundException("No such user.");
        }

        return user;
    }

    @Override
    public int getWaitingOrdersSize() {
        try {
           return this.ordersRepository.countAllByDeliveredFalse();
        } catch (DataIntegrityViolationException e) {
           return 0;
        }
    }

    @Override
    public int getDeliveredOrdersSize() {
        try {
            return this.ordersRepository.countAllByDeliveredTrue();
        } catch (DataIntegrityViolationException e) {
            return 0;
        }
    }

    @Override
    public String getUserProfilePicture(String username) {
        Optional<User> user = this.userRepository.findByUsername(username);
        if (user.isPresent()) {
            return user.get().getProfilePicture();
        } else {
            return "";
        }
    }
}
