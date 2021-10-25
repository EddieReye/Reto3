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
    
    public Client update(Client c){
        if(c.getIdClient()!=null){
            Optional<Client>g=clientRepository.getClient(c.getIdClient());
            if(!g.isEmpty()){
                if(c.getName()!=null){
                    g.get().setName(c.getName());
                }
                if(c.getEmail()!=null){
                    g.get().setEmail(c.getEmail());
                }
                 if(c.getPassword()!=null){
                    g.get().setPassword(c.getPassword());
                }
                  if(c.getAge()!=null){
                    g.get().setAge(c.getAge());
                }
                return clientRepository.save(g.get());

            }
        }
        return c;

    }

    public boolean deleteClient(int id){
        Optional<Client> c=getClient(id);
        if(!c.isEmpty()){
            clientRepository.delete(c.get());
            return true;
        }
        return false;

    }
}
