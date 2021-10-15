/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package co.usa.ciclo3.ciclo3.dao;

import co.usa.ciclo3.ciclo3.entities.Message;
import co.usa.ciclo3.ciclo3.entities.MessageCrud;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author guard
 */
@Repository
public class MessageRepository {
    
    @Autowired
  private MessageCrud messageCrudRepository;
  
  public List<Message> getAll() {return (List<Message>) messageCrudRepository.findAll();};
  
  public Optional<Message> getMessage(int id) {return messageCrudRepository.findById(id);};
  
  public Message save(Message message) { return messageCrudRepository.save(message);};
    
}
