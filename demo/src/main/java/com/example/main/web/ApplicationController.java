package com.example.main.web;

import com.example.main.entity.*;
import com.example.main.entity.dto.WorkDto;
import com.example.main.exception.WorksNotFoundException;
import com.example.main.service.CarsService;
import com.example.main.service.MastersService;
import com.example.main.service.ServicesService;
import com.example.main.service.WorksService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.management.ServiceNotFoundException;
import javax.servlet.*;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/app")
public class ApplicationController {

    private WorksService worksService;
    private CarsService carsService;
    private MastersService mastersService;
    private ServicesService servicesService;

    @RequestMapping(
            value = "/*",
            method = RequestMethod.OPTIONS
    )
    public ResponseEntity handle() {
        return new ResponseEntity(HttpStatus.OK);
    }

    @Component("/*")
    public static class myFilter implements Filter {
        @Override
        public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
            HttpServletResponse hsr = (HttpServletResponse) servletResponse;
            hsr.setHeader("Access-Control-Allow-Origin", "*");
            hsr.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
            hsr.setHeader("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
            filterChain.doFilter(servletRequest, servletResponse);
        }
    }

    @PostMapping(value = "/addWork", consumes = "application/json", produces = "application/json")
    public Work addWork(@RequestBody WorkDto newWork) throws ServiceNotFoundException, NotFoundException {
        return worksService.addWork(newWork);
    }

    @PostMapping(value = "/addCar", consumes = "application/json", produces = "application/json")
    public Car addCar(@RequestBody Car newCar) {
        return carsService.addCar(newCar);
    }

    @PostMapping(value = "/addMaster", consumes = "application/json", produces = "application/json")
    public Master addMaster(@RequestBody Master newMaster) {
        return mastersService.addMaster(newMaster);
    }

    @PostMapping(value = "/addService", consumes = "application/json", produces = "application/json")
    public Services addService(@RequestBody Services newService) {
        return servicesService.addService(newService);
    }

    @GetMapping("/works")
    public ResponseEntity<List<Work>> getAllWorks() {
        List<Work> list = worksService.listWorks();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/masters")
    public ResponseEntity<List<Master>> getAllMasters() {
        List<Master> list = mastersService.listMasters();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
    @GetMapping("/cars")
    public ResponseEntity<List<Car>> getAllCars() {
        List<Car> list = carsService.listCars();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
    @GetMapping("/services")
    public ResponseEntity<List<Services>> getAllServices() {
        List<Services> list = servicesService.listServices();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/works/{id}")
    public ResponseEntity<Work> getWork(@PathVariable("id") long id) {
        try {
            return new ResponseEntity<>(worksService.findWork(id), HttpStatus.OK);
        }catch (WorksNotFoundException ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "This work not found");
        }
    }

    @GetMapping("/cars/{id}")
    public ResponseEntity<Car> getCar(@PathVariable("id") long id) {
        try {
            return new ResponseEntity<>(carsService.findCar(id), HttpStatus.OK);
        }catch (WorksNotFoundException | NotFoundException ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "This car not found");
        }
    }

    @GetMapping("/masters/{id}")
    public ResponseEntity<Master> getMaster(@PathVariable("id") long id) {
        try {
            return new ResponseEntity<>(mastersService.findMaster(id), HttpStatus.OK);
        }catch (WorksNotFoundException | NotFoundException ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "This master not found");
        }
    }

    @GetMapping("/services/{id}")
    public ResponseEntity<Services> getService(@PathVariable("id") long id) {
        try {
            return new ResponseEntity<>(servicesService.findService(id), HttpStatus.OK);
        }catch (WorksNotFoundException | NotFoundException ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "This service not found");
        }
    }


    @PostMapping("/delete/cars/{id}")
    public ResponseEntity<List<Car>> deleteCar(@PathVariable("id") long id) {
        try {
            carsService.deleteCar(id);
            return new ResponseEntity<>(carsService.listCars(), HttpStatus.OK);
        }catch (WorksNotFoundException ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "This car not found");
        }
    }

    @PostMapping("/delete/masters/{id}")
    public ResponseEntity<List<Master>> deleteMaster(@PathVariable("id") long id) {
        try {
            mastersService.deleteMaster(id);
            return new ResponseEntity<>(mastersService.listMasters(), HttpStatus.OK);
        }catch (WorksNotFoundException ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "This master not found");
        }
    }

    @PostMapping("/delete/services/{id}")
    public ResponseEntity<List<Services>> deleteService(@PathVariable("id") long id) {
        try {
            servicesService.deleteService(id);
            return new ResponseEntity<>(servicesService.listServices(), HttpStatus.OK);
        }catch (WorksNotFoundException ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "This service not found or delete mistake");
        }
    }

    @PostMapping("/delete/works/{id}")
    public ResponseEntity<List<Work>> deleteWorks(@PathVariable("id") long id) {
        try {
            worksService.deleteWork(id);
            return new ResponseEntity<>(worksService.listWorks(), HttpStatus.OK);
        }catch (WorksNotFoundException ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "This work not found or delete mistake");
        }
    }

    @PostMapping(value = "edit/works/{id}", consumes = "application/json", produces = "application/json")
    public Work changeWork(@PathVariable("id") long id, @RequestBody WorkDto dto) throws NotFoundException, ServiceNotFoundException {
        return worksService.editWork(id, dto);
    }

    @PostMapping(value = "edit/cars/{id}", consumes = "application/json", produces = "application/json")
    public Car changeCar(@PathVariable("id") long id, @RequestBody Car car) throws ServiceNotFoundException, NotFoundException {
        return carsService.editCar(id, car.getMark(), car.getNum(), car.isIsForeign(), car.getColor());
    }

    @PostMapping(value = "edit/services/{id}", consumes = "application/json", produces = "application/json")
    public Services changeService(@PathVariable("id") long id, @RequestBody Services service) throws ServiceNotFoundException, NotFoundException {
        return servicesService.editService(id, service.getName(), service.getCostOur(), service.getCostForeign());
    }

    @PostMapping(value = "edit/masters/{id}", consumes = "application/json", produces = "application/json")
    public Master changeMaster(@PathVariable("id") long id, @RequestBody Master master){
        return mastersService.editMaster(id, master.getName());
    }

    @Autowired
    public void setWorksService(WorksService worksService) {
        this.worksService = worksService;
    }
    @Autowired
    public void setCarsService(CarsService carsService) {
        this.carsService = carsService;
    }
    @Autowired
    public void setMastersService(MastersService mastersService) {
        this.mastersService = mastersService;
    }
    @Autowired
    public void setServicesService(ServicesService servicesService) {
        this.servicesService = servicesService;
    }
}
