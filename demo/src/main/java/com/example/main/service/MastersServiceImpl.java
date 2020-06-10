package com.example.main.service;

import com.example.main.entity.Master;
import com.example.main.entity.Work;
import com.example.main.exception.WorksNotFoundException;
import com.example.main.repository.MastersRepository;
import com.example.main.repository.WorksRepository;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MastersServiceImpl implements MastersService{

    @Autowired
    private MastersRepository mastersRepository;

    @Autowired
    private WorksRepository worksRepository;

    @Override
    public List<Master> listMasters() {
        return (List<Master>) mastersRepository.findAll();
    }

    @Override
    public Master findMaster(long id) throws NotFoundException {
        Optional<Master> optionalMasters = mastersRepository.findById(id);
        if (optionalMasters.isPresent())
        {
            return optionalMasters.get();
        } else {
            throw new NotFoundException("This master not found");
        }
    }

    @Override
    public Master addMaster(Master master) {
        return mastersRepository.save(master);
    }

    @Override
    public void deleteMaster(long id) {
        worksRepository.deleteByMasterId(id);
        mastersRepository.deleteById(id);
    }

    @Override
    public Master editMaster(long id, String name) {
        Optional<Master> optionalMasters = mastersRepository.findById(id);
        if (optionalMasters.isPresent()) {
            Master master = optionalMasters.get();
            master.setName(name);
            mastersRepository.save(master);
            return optionalMasters.get();
        } else {
            throw new WorksNotFoundException("This master not found");
        }
    }
}
