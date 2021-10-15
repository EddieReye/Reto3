/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package co.usa.ciclo3.ciclo3.service;

import co.usa.ciclo3.ciclo3.dao.MotorbikeRepository;
import co.usa.ciclo3.ciclo3.entities.Motorbike;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author guard
 */
@Service
public class MotorbikeService {
    
    @Autowired
    MotorbikeRepository motorbikeRepository;
    
    public List<Motorbike> getAll() {return (List<Motorbike>) motorbikeRepository.getAll();};
  
    public Optional<Motorbike> getMotorbike(int id) {return motorbikeRepository.getMotorbike(id);};
  
    public Motorbike save(Motorbike motorbike) { 
        if (motorbike.getId()== null){
            return motorbikeRepository.save(motorbike);
        }
        else
        {
            Optional<Motorbike> co =  motorbikeRepository.getMotorbike(motorbike.getId());
            if (co.isEmpty()){
                return motorbikeRepository.save(motorbike);
            }
            else
            {
                return motorbike;
            }
        }
 
    }
    
}
