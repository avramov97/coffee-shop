package org.westernacher.solutions;

import junit.runner.Version;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.context.junit4.SpringRunner;
import org.westernacher.solutions.service.UserService;

import static junit.framework.TestCase.assertEquals;
import static junit.framework.TestCase.assertTrue;

@RunWith(SpringRunner.class)
@SpringBootTest
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class UserServiceTestsSpringContext {
    @Autowired
    private UserService userService;

    @Test
    public void a_testGetUserAuthority_withUserId_userShouldBeRootAdmin() {
          System.out.println("JUnit version is: " + Version.id());
        final String ID = "190b19cc-f592-40e1-b67a-5d41e5536e90";
        String authority = this.userService.getUserAuthority(ID);
        assertEquals("Cannot get authority or false authority.", "ROOT-ADMIN", authority);
    }

    @Test
    public void b_testGetUserAuthority_withUserId_userShouldBeAdmin() {
        final String ID = "00301548-6534-44e3-bebb-fe4bafd82422";
        String authority = this.userService.getUserAuthority(ID);
        assertEquals("Cannot get authority or false authority.", "ADMIN", authority);
    }

    @Test
    public void c_testGetUserAuthority_withUserId_userShouldBeModerator() {
        final String ID = "e6388b00-cfdf-4e87-90e7-0df49749339e";
        String authority = this.userService.getUserAuthority(ID);
        assertEquals("Cannot get authority or false authority.", "MODERATOR", authority);
    }

    @Test
    public void d_testGetUserAuthority_withUserId_userShouldBeRoleUser() {
        final String ID = "e1e9468a-d8e7-4079-9825-54445db0d893";
        String authority = this.userService.getUserAuthority(ID);
        assertEquals("Cannot get authority or false authority.", "ROLE_USER", authority);
    }

    @Test
    public void e_testLoadUserByUsername_withUsername_usernameShouldBeDimitaravramov() {
        final String username = "dimitaravramov";
        UserDetails foundUser = this.userService.loadUserByUsername(username);
        assertEquals("Cannot find such username.", "dimitaravramov", foundUser.getUsername());
    }

    @Test
    public void f_testLoadUserByUsername_withUsername_usernameShouldBeTijana() {

        final String username = "tijana";
        UserDetails foundUser = this.userService.loadUserByUsername(username);
        assertEquals("Cannot find such username.", "tijana", foundUser.getUsername());
    }

    @Test
    public void g_testLoadUserByUsername_withUsername_usernameShouldBeModerator() {

        final String username = "moderator";
        UserDetails foundUser = this.userService.loadUserByUsername(username);
        assertEquals("Cannot find such username.", "moderator", foundUser.getUsername());
    }

    @Test
    public void h_testLoadUserByUsername_withUsername_usernameShouldBeWeber() {

        final String username = "petko";
        UserDetails foundUser = this.userService.loadUserByUsername(username);
        assertEquals("Cannot find such username.", "petko", foundUser.getUsername());
    }

    // Demote & Promote -> Cause changes in database
//
//    @Test
//    public void i_testDemoteUser_withId_userTijanaShouldBeDemoted() {
//
//        final String ID = "5cfe2954-887f-4b24-a5e6-edb1ea937c19"; // current role: admin, username: tijana
//        boolean result = this.userService.demoteUser(ID);
//        assertEquals("Demote process is not completed.", true, result);
//    }
//
//    @Test
//    public void j_testDemoteUser_withId_userModeratorShouldBeDemoted() {
//
//        final String ID = "6ae8efca-8825-4922-9c73-0b9b2bff3b14"; // current role: moderator, username: moderator
//        boolean result = this.userService.demoteUser(ID);
//        assertTrue("Demote process is not completed.", result);
//    }
//
//    @Test
//    public void k_testPromoteUser_withId_userModeratorShouldBePromoted() {
//
//        final String ID = "6ae8efca-8825-4922-9c73-0b9b2bff3b14"; // current role: role_user, username: moderator
//        boolean result = this.userService.promoteUser(ID);
//        assertEquals("Promote process is not completed.", true, result);
//    }
//
//   @Test
//   public void l_testPromoteUser_withId_userTijanaShouldBePromoted() {
//
//       final String ID = "5cfe2954-887f-4b24-a5e6-edb1ea937c19"; // current role: moderator, username: tijana
//       boolean result = this.userService.promoteUser(ID);
//       assertTrue("Promote process is not completed.", result);
//   }
//
//    @Test
//    public void m_testPromoteUser_withId_userWeberShouldBePromoted() {
//
//        final String ID = "79e2d86c-c119-4a86-9c17-920e46f005cd"; // current role: role_user, username: Weber
//        boolean result = this.userService.promoteUser(ID);
//        assertEquals("Promote process is not completed.", true, result);
//    }
//
//    @Test
//    public void n_testPromoteUser_withId_userWeberShouldBeDemoted() {
//
//        final String ID = "79e2d86c-c119-4a86-9c17-920e46f005cd"; // current role: moderator, username: Weber
//        boolean result = this.userService.demoteUser(ID);
//        assertEquals("Demote process is not completed.", true, result);
//    }
//
//    // Delete user
//
//    @Test
//    public void o_testDeleteUser_withUsername_userTempShouldBeDeleted() {
//
//        final String username = "temp"; // current role: role_user, username: temp
//        boolean result = this.userService.deleteUser(username);
//        assertTrue("Delete process is not completed.", result);
//    }
}
