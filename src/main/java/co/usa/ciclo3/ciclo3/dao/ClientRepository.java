/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package co.usa.ciclo3.ciclo3.dao;

import co.usa.ciclo3.ciclo3.entities.Client;
import co.usa.ciclo3.ciclo3.entities.ClientCrud;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author guard
 */
@Repository
public class ClientRepository {
    
    @Autowired
  private ClientCrud clientCrudRepository;
  
  public List<Client> getAll() {return (List<Client>) clientCrudRepository.findAll();};
  
  public Optional<Client> getClient(int id) {return clientCrudRepository.findById(id);};
  
  public Client save(Client client) { return clientCrudRepository.save(client);};
    
}
