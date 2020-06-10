package com.example.main.service;

import com.example.main.entity.Services;
import com.example.main.exception.WorksNotFoundException;
import com.example.main.repository.ServicesRepository;
import com.example.main.repository.WorksRepository;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServicesServiceImpl implements ServicesService{

    @Autowired
    private ServicesRepository servicesRepository;
    @Autowired
    private WorksRepository worksRepository;

    @Override
    public List<Services> listServices() {
        return (List<Services>) servicesRepository.findAll();
    }

    @Override
    public Services findService(long id) throws NotFoundException {
        Optional<Services> optionalServices = servicesRepository.findById(id);
        if (optionalServices.isPresent())
        {
            return optionalServices.get();
        } else {
            throw new NotFoundException("This service not found");
        }
    }

    @Override
    public Services addService(Services service) {
        return servicesRepository.save(service);
    }

    @Override
    public void deleteService(long id) {
        worksRepository.deleteByServiceId(id);
        servicesRepository.deleteById(id);
    }

    @Override
    public Services editService(long id, String name, Integer cost_our, Integer cost_foreign) {
        Optional<Services> optionalServices = servicesRepository.findById(id);
        if (optionalServices.isPresent()) {
            Services services = optionalServices.get();

            services.setCostForeign(cost_foreign);
            services.setName(name);
            services.setCostOur(cost_our);
            servicesRepository.save(services);
            return optionalServices.get();
        } else {
            throw new WorksNotFoundException("This service not found");
        }
    }
}
