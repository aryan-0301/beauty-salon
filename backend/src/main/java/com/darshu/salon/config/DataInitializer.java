package com.darshu.salon.config;

import com.darshu.salon.entity.User;
import com.darshu.salon.enums.Role;
import com.darshu.salon.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (!userRepository.existsByEmail("admin@darshu.com")) {
            User admin = User.builder()
                    .name("Admin User")
                    .email("admin@darshu.com")
                    .password(passwordEncoder.encode("admin123"))
                    .role(Role.ADMIN)
                    .build();
            userRepository.save(admin);
            System.out.println("Default admin user created: admin@darshu.com / admin123");
        }
    }
}
