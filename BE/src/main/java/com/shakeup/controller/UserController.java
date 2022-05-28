package com.shakeup.controller;

import com.shakeup.config.JwtTokenProvider;
import com.shakeup.model.Users;

import com.shakeup.request.user.*;
import com.shakeup.repository.UserRepository;
import com.shakeup.request.*;
import com.shakeup.service.UserService;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin("*")
@RequestMapping("/user")
@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;


    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    public static final Logger logger = LoggerFactory.getLogger(UserController.class);

    // 승관 부분
    @ApiOperation(value = "로그인")
    @PostMapping(value = "/login")
    public Object login(@RequestBody UserLoginRequest userLoginRequest) {
        Users member = userRepository.findById(userLoginRequest.getId())
                .orElseThrow(() -> new IllegalArgumentException("가입되지 않은 ID 입니다."));
        System.out.println("test : " + member.toString());
        if (!passwordEncoder.matches(userLoginRequest.getPassword(), member.getPassword())) {
            throw new IllegalArgumentException("잘못된 비밀번호입니다.");
        }

        UserLoginResponse userLoginResponse = new UserLoginResponse();
        userLoginResponse.setUser(member);
        userLoginResponse.setToken(jwtTokenProvider.createToken(member, member.getRoles()));

        return userLoginResponse;
    }

    @ApiOperation(value = "이메일로 유저 정보 가져오기")
    @GetMapping(value = "/{email}")
    public ResponseEntity<Users> getId(@PathVariable("email") String email) {
        Optional<Users> user = userService.findByEmail(email);
        if (!user.isPresent()) {
            return null;
        }
        return new ResponseEntity<Users>(user.get(), HttpStatus.OK);
    }

    @ApiOperation(value = "비밀번호 찾기")
    @PostMapping(value = "/sendpw")
    public ResponseEntity<String> sendId(@RequestBody UserSendpwRequest userSendpwRequest) {
        String check = "값 없음.";
        String res = userService.sendPw(userSendpwRequest);
        if (check.equals(res)) {
            return new ResponseEntity<>("올바른 정보를 입력하세요.", HttpStatus.OK);
        }
        return new ResponseEntity<>(userService.sendPw(userSendpwRequest), HttpStatus.OK);
    }

    @ApiOperation(value = "새로운 비밀번호 받기")
    @PostMapping(value = "/resetpw")
    public ResponseEntity<String> ResetPw(@RequestBody UserResetPwdRequest userResetPwdRequest) {
        String res = userService.resetPw(userResetPwdRequest);
        if (res.equals("fail")) {
            return new ResponseEntity<>("변경 실패", HttpStatus.OK);
        }
        return new ResponseEntity<>("변경 성공", HttpStatus.OK);
    }


    // 다은 부분
    // 날짜 => 프론트에서
    @ApiOperation(value = "회원가입")
    @PostMapping(value = "/signup")
    public ResponseEntity<String> signUp(@RequestBody UserSignUpRequest request) {
        String user = userService.signUp(request);
        if (user.equals("fail")) {
            return new ResponseEntity<>("회원가입 실패", HttpStatus.OK);
        }
        return new ResponseEntity<>("회원가입 성공", HttpStatus.OK);
    }

    @ApiOperation(value = "아이디 중복 확인")
    @GetMapping(value = "/idcheck/{id}")
    public ResponseEntity<String> checkId(@PathVariable("id") String id) {
        String result = userService.checkId(id);
        if (result.equals("fail")) {
            return new ResponseEntity<>("fail", HttpStatus.OK);
        }
        return new ResponseEntity<>("성공", HttpStatus.OK);
    }

    @ApiOperation(value = "채널명 중복 확인")
    @GetMapping(value = "/name/{name}")
    public ResponseEntity<String> checkName(@PathVariable("name") String name) {
        String result = userService.checkName(name);
        if (result.equals("fail")) {
            return new ResponseEntity<>("실패", HttpStatus.OK);
        }
        return new ResponseEntity<>("성공", HttpStatus.OK);
    }

    @GetMapping(value = "/emailcheck/{email}")
    public ResponseEntity<String> emailCheck(@PathVariable("email") String email) {
        System.out.println("1");
        String result = userService.checkEmail(email);

        System.out.println("emailCheck 실행");

        return new ResponseEntity<>(result, HttpStatus.OK);
    }


    // 기태 부분
    @ApiOperation(value = "회원 정보 수정", notes = "회원의 정보를 수정한다. 그리고 DB수정 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
    @PutMapping
    public ResponseEntity<String> modifyUser(@RequestBody UserChangeInfoRequest request) {
        logger.info("modifyUser - 호출");
        String res = userService.changeinfo(request);

        if (res.equals("fail")) {
            return new ResponseEntity<>("변경 실패", HttpStatus.OK);
        }
        return new ResponseEntity<>("변경 성공", HttpStatus.OK);
    }

    @ApiOperation(value = "회원 탈퇴", notes = "id에 해당하는 회원의 정보를 삭제한다.(그와 동시에 회원이 적은 게시글들의 id가 '탈퇴한 회원'으로 바뀐다.) 그리고 DB삭제 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
    @DeleteMapping("/{uid}")
    public ResponseEntity<String> deleteUser(@PathVariable("uid") int uid) {
        logger.info("deleteUser - 호출");
        String res = userService.deleteUser(uid);

        if (res.equals("fail")) {
            return new ResponseEntity<>("계정 삭제 실패", HttpStatus.OK);
        }
        return new ResponseEntity<>("계정 삭제 성공", HttpStatus.OK);
    }

    @ApiOperation(value = "uid로 회원 정보 읽어오기", notes = "해당 유저 정보 읽어오기", response = String.class)
    @GetMapping("/read/{uid}")
    public ResponseEntity<?> readUser(@PathVariable int uid) {
        Optional<Users> checkUser = userRepository.findByUid(uid);

        if (checkUser.isPresent()) {
            return new ResponseEntity<>(checkUser.get(), HttpStatus.OK);
        }

        return new ResponseEntity<>("회원 정보가 없습니다.", HttpStatus.BAD_REQUEST);
    }

}
