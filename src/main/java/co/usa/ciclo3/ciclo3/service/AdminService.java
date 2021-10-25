/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package co.usa.ciclo3.ciclo3.service;

import co.usa.ciclo3.ciclo3.dao.AdminRepository;
import co.usa.ciclo3.ciclo3.entities.Admin;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author guard
 */
@Service
public class AdminService {
	
    @Autowired
    AdminRepository adminRepository;
    
    public List<Admin> getAll() {return (List<Admin>) adminRepository.getAll();};
  
    public Optional<Admin> getAdmin(int id) {return adminRepository.getAdmin(id);};
  
    public Admin save(Admin admin) { 
        if (admin.getId()== null){
            return adminRepository.save(admin);
        }
        else
        {
            Optional<Admin> co =  adminRepository.getAdmin(admin.getId());
            if (co.isEmpty()){
                return adminRepository.save(admin);
            }
            else
            {
                return admin;
            }
        }
 
    }
    
    public Admin update(Admin c){
        if(c.getId()!=null){
            Optional<Admin>g=adminRepository.getAdmin(c.getId());
            if(!g.isEmpty()){
                if(c.getName()!=null){
                    g.get().setName(c.getName());
                }
                if(c.getPassword()!=null){
                    g.get().setPassword(c.getPassword());
                }
                if(c.getEmail()!=null){
                    g.get().setEmail(c.getEmail());
                }
                return adminRepository.save(g.get());

            }
        }
        return c;

    }

    public boolean deleteAdmin(int id){
        Optional<Admin> c=getAdmin(id);
        if(!c.isEmpty()){
            adminRepository.delete(c.get());
            return true;
        }
        return false;

    }	
	
}
