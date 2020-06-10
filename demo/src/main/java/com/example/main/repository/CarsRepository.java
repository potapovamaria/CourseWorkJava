package com.example.main.repository;

import com.example.main.entity.Car;
import org.springframework.data.repository.CrudRepository;

public interface CarsRepository extends CrudRepository<Car, Long> {
}
