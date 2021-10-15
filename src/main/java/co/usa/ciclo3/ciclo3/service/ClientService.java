/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package co.usa.ciclo3.ciclo3.service;

import co.usa.ciclo3.ciclo3.dao.ClientRepository;
import co.usa.ciclo3.ciclo3.entities.Client;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author guard
 */
@Service
public class ClientService {
    
    @Autowired
    ClientRepository clientRepository;
    
    public List<Client> getAll() {return (List<Client>) clientRepository.getAll();};
  
    public Optional<Client> getClient(int id) {return clientRepository.getClient(id);};
  
    public Client save(Client client) { 
        if (client.getIdClient()== null){
            return clientRepository.save(client);
        }
        else
        {
            Optional<Client> co =  clientRepository.getClient(client.getIdClient());
            if (co.isEmpty()){
                return clientRepository.save(client);
            }
            else
            {
                return client;
            }
        }
 
    }
    
}
