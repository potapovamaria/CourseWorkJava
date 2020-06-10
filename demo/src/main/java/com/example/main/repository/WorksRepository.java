package com.example.main.repository;

import com.example.main.entity.Work;
import org.springframework.data.repository.CrudRepository;

public interface WorksRepository extends CrudRepository<Work, Long> {
    void deleteByMasterId(long id);
    void deleteByCarId(long id);
    void deleteByServiceId(long id);
}
