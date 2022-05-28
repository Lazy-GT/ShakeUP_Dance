package com.shakeup.config;

/**
 *
 *
 * WebSecurityConfig의 설명을 여기에 작성한다.
 * SpringCecurity의 설정 정보를 저장하는 곳.
 * 아래 공부한 라인별로 주석처리 해놓음.
 *
 * @author gwan
 * @version 1.0.0
 * 작성일 2022-01-25
 *
 *
**/

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsUtils;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.httpBasic().disable() // rest api 이므로 기본설정 사용안해서 disable 적용. -> enable시 사용지 비 인증시 로그인 vue 폼 페이지가 뜬다.
                .cors().and()
                .csrf().disable() // rest api에서 csrf 보안이 필요 없으므로 disable처리.
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) //jwt token인증 방식이므로 세션은 필요없다.
                .and()
                .authorizeRequests() // 아래 Matchers에 해당되는 사용권한 체크 -> 여기서도 권한이 없으면 vue form 로그인 페이지로 이어진다.
                .requestMatchers(CorsUtils::isPreFlightRequest).permitAll()
                .antMatchers("/user/**").permitAll() // 회원관리에 대한 주소는 누구나 접근 가능.
                .antMatchers(HttpMethod.OPTIONS,"/**").permitAll()
                .antMatchers(HttpMethod.POST,"/**").permitAll()
                .antMatchers(HttpMethod.DELETE,"/**").permitAll()
                .antMatchers(HttpMethod.GET,"/**").permitAll()
                .antMatchers(HttpMethod.PUT,"/**").permitAll()
                .antMatchers("/board/**").hasAnyRole("USER") // 이렇게 사용시 게시판관련 api는 유저 인증된 사람만 가능.
                .and()
                .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider),
                        UsernamePasswordAuthenticationFilter.class);

    }
}
