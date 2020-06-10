package com.example.main.service;

import com.example.main.entity.*;
import com.example.main.entity.dto.WorkDto;
import com.example.main.exception.WorksNotFoundException;
import com.example.main.repository.WorksRepository;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.management.ServiceNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
public class WorksServiceImpl implements WorksService{

    @Autowired
    private WorksRepository worksRepository;

    @Autowired
    private CarsService carsService;
    @Autowired
    private MastersService mastersService;
    @Autowired
    private ServicesService servicesService;

    @Override
    public List<Work> listWorks() {
        return (List<Work>) worksRepository.findAll();
    }

    @Override
    public Work findWork(long id) {
        Optional<Work> optionalWorks = worksRepository.findById(id);
        if (optionalWorks.isPresent())
        {
            return optionalWorks.get();
        } else {
            throw new WorksNotFoundException("This work not found");
        }
    }

    @Override
    public Work addWork(WorkDto dto) throws ServiceNotFoundException, NotFoundException {
        final Work work = fromDto(dto);
        return worksRepository.save(work);
    }

    @Override
    public void deleteWork(long id) {
        worksRepository.deleteById(id);
    }

    @Override
    public Work editWork(long id, WorkDto dto) throws ServiceNotFoundException, NotFoundException {
        Optional<Work> optionalWorks = worksRepository.findById(id);
        if (optionalWorks.isPresent())
        {
            Work work = optionalWorks.get();
            Work newwork = fromDto(dto);
            work.setCars(newwork.getCars());
            work.setMasters(newwork.getMasters());
            work.setDateWork(newwork.getDateWork());
            work.setServices(newwork.getServices());
            worksRepository.save(work);
            return optionalWorks.get();
        } else {
            throw new WorksNotFoundException("This work not found");
        }
    }

    private Work fromDto(final WorkDto dto) throws NotFoundException {
        final Master master = mastersService.findMaster(dto.getMasterId());
        final Car car = carsService.findCar(dto.getCarId());
        final Services service = servicesService.findService(dto.getServiceId());

        return new Work(
                dto.getDateWork(),
                master,
                service,
                car
        );
    }
}
