package com.example.main.service;

import com.example.main.entity.Services;
import javassist.NotFoundException;

import javax.management.ServiceNotFoundException;
import java.util.List;

public interface ServicesService {
    List<Services> listServices();
    Services findService(long id) throws NotFoundException;
    Services addService(Services services);
    void deleteService(long id);
    Services editService(long id, String name, Integer cost_our, Integer cost_foreign);
}
