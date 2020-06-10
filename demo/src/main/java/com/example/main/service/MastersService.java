package com.example.main.service;

import com.example.main.entity.Master;
import javassist.NotFoundException;

import java.util.List;

public interface MastersService {
    List<Master> listMasters();
    Master findMaster(long id) throws NotFoundException;
    Master addMaster(Master master);
    void deleteMaster(long id);
    Master editMaster(long id, String name);
}
