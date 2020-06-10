package com.example.main;

import com.example.main.entity.*;
import com.example.main.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Collections;

@Component
public class TestDataInit implements CommandLineRunner {

    @Autowired
    WorksRepository worksRepository;

    @Autowired
    CarsRepository carsRepository;

    @Autowired
    ServicesRepository servicesRepository;

    @Autowired
    MastersRepository mastersRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder pwdEncoder;

    @Override
    public void run(String... args) throws Exception {
        Car car1 = new Car("tritiu", "black", "opel", true);
        Car car2 = new Car("trffrfr44", "white", "bmw", true);
        Master master1 = new Master("Vlad");
        Master master2 = new Master("Slava");
        Services service = new Services("Demontage", 333, 555);
        Services service2 = new Services("Shini", 333, 555);
        carsRepository.save(car1);
        carsRepository.save(car2);
        mastersRepository.save(master1);
        mastersRepository.save(master2);
        servicesRepository.save(service);
        servicesRepository.save(service2);
        worksRepository.save(new Work("17.05.2020", master1, service, car1));
        worksRepository.save(new Work("16.05.2020", master2, service, car2));
        worksRepository.save(new Work("18.05.2020", master1, service2, car2));
        userRepository.save(new User("admin", pwdEncoder.encode("456"), Collections.singletonList("ROLE_ADMIN")));
        userRepository.save(new User("user", pwdEncoder.encode("123"), Collections.singletonList("ROLE_USER")));
    }
}
