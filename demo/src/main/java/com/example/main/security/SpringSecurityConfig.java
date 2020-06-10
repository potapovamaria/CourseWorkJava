package com.example.main.security;

import com.example.main.security.jwt.JwtSecurityConfigurer;
import com.example.main.security.jwt.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;

@Configuration
public class SpringSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.httpBasic().disable()
                .csrf().disable()
                .formLogin().disable()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                .antMatchers(HttpMethod.POST, "/app/auth/signin").permitAll()
                .antMatchers(HttpMethod.OPTIONS, "/app/auth/signin").permitAll()
                .antMatchers(HttpMethod.GET, "/app/cars/{id}").hasAnyRole("ADMIN", "USER")
                .antMatchers(HttpMethod.OPTIONS, "/app/cars/{id}").permitAll()
                .antMatchers(HttpMethod.POST, "/app/addCar").hasRole("ADMIN")
                .antMatchers(HttpMethod.OPTIONS, "/app/addCar").permitAll()
                .antMatchers(HttpMethod.GET, "/app/cars").hasAnyRole("ADMIN", "USER")
                .antMatchers(HttpMethod.OPTIONS, "/app/cars").permitAll()
                .antMatchers(HttpMethod.GET, "/app/masters/{id}").hasAnyRole("ADMIN", "USER")
                .antMatchers(HttpMethod.OPTIONS, "/app/masters/{id}").permitAll()
                .antMatchers(HttpMethod.POST, "/app/addMaster").hasRole("ADMIN")
                .antMatchers(HttpMethod.OPTIONS, "/app/addMaster").permitAll()
                .antMatchers(HttpMethod.GET, "/app/masters" ).hasAnyRole("ADMIN", "USER")
                .antMatchers(HttpMethod.OPTIONS, "/app/masters" ).permitAll()
                .antMatchers(HttpMethod.GET, "/app/services/{id}").hasAnyRole("ADMIN", "USER")
                .antMatchers(HttpMethod.OPTIONS, "/app/services/{id}").permitAll()
                .antMatchers(HttpMethod.POST, "/app/addService").hasRole("ADMIN")
                .antMatchers(HttpMethod.OPTIONS, "/app/addService").permitAll()
                .antMatchers(HttpMethod.GET, "/app/services" ).hasAnyRole("ADMIN", "USER")
                .antMatchers(HttpMethod.OPTIONS, "/app/services" ).permitAll()
                .antMatchers(HttpMethod.GET, "/app/works/{id}").hasAnyRole("ADMIN", "USER")
                .antMatchers(HttpMethod.OPTIONS, "/app/works/{id}").permitAll()
                .antMatchers(HttpMethod.POST, "/app/addWork").hasRole("ADMIN")
                .antMatchers(HttpMethod.OPTIONS, "/app/addWork").permitAll()
                .antMatchers(HttpMethod.GET, "/app/works" ).hasAnyRole("ADMIN", "USER")
                .antMatchers(HttpMethod.OPTIONS, "/app/works" ).permitAll()
                .antMatchers(HttpMethod.POST, "/app/delete/works/{id}").hasRole("ADMIN")
                .antMatchers(HttpMethod.OPTIONS, "/app/delete/works/{id}").permitAll()
                .antMatchers(HttpMethod.POST, "/app/delete/masters/{id}").hasRole("ADMIN")
                .antMatchers(HttpMethod.OPTIONS, "/app/delete/masters/{id}").permitAll()
                .antMatchers(HttpMethod.POST, "/app/delete/services/{id}").hasRole("ADMIN")
                .antMatchers(HttpMethod.OPTIONS, "/app/delete/services/{id}").permitAll()
                .antMatchers(HttpMethod.POST, "/app/delete/cars/{id}").hasRole("ADMIN")
                .antMatchers(HttpMethod.OPTIONS, "/app/delete/cars/{id}").permitAll()
                .antMatchers(HttpMethod.POST, "/app/edit/works/{id}").hasRole("ADMIN")
                .antMatchers(HttpMethod.OPTIONS, "/app/edit/works/{id}").permitAll()
                .antMatchers(HttpMethod.POST, "/app/edit/masters/{id}").hasRole("ADMIN")
                .antMatchers(HttpMethod.OPTIONS, "/app/edit/masters/{id}").permitAll()
                .antMatchers(HttpMethod.POST, "/app/edit/services/{id}").hasRole("ADMIN")
                .antMatchers(HttpMethod.OPTIONS, "/app/edit/services/{id}").permitAll()
                .antMatchers(HttpMethod.POST, "/app/edit/cars/{id}").hasRole("ADMIN")
                .antMatchers(HttpMethod.OPTIONS, "/app/edit/cars/{id}").permitAll()
                .anyRequest().authenticated()
                .and()
                .apply(new JwtSecurityConfigurer(jwtTokenProvider));
    }
}
