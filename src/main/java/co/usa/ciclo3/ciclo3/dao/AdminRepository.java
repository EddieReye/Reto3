/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package co.usa.ciclo3.ciclo3.dao;

import co.usa.ciclo3.ciclo3.entities.Admin;
import co.usa.ciclo3.ciclo3.entities.AdminCrud;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author guard
 */
@Repository
public class AdminRepository {
	
    @Autowired
    private AdminCrud adminCrudRepository;
  
    public List<Admin> getAll() {return (List<Admin>) adminCrudRepository.findAll();};
  
    public Optional<Admin> getAdmin(int id) {return adminCrudRepository.findById(id);};
  
    public Admin save(Admin admin) { return adminCrudRepository.save(admin);};
  
    public void delete(Admin admin){ adminCrudRepository.delete(admin);};	
}
