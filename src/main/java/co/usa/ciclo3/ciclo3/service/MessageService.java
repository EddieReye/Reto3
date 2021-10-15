/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package co.usa.ciclo3.ciclo3.service;

import co.usa.ciclo3.ciclo3.dao.MessageRepository;
import co.usa.ciclo3.ciclo3.entities.Message;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author guard
 */
@Service
public class MessageService {
    
    @Autowired
    MessageRepository messageRepository;
    
    public List<Message> getAll() {return (List<Message>) messageRepository.getAll();};
  
    public Optional<Message> getMessage(int id) {return messageRepository.getMessage(id);};
  
    public Message save(Message message) { 
        if (message.getIdMessage()== null){
            return messageRepository.save(message);
        }
        else
        {
            Optional<Message> co =  messageRepository.getMessage(message.getIdMessage());
            if (co.isEmpty()){
                return messageRepository.save(message);
            }
            else
            {
                return message;
            }
        }
 
    }
    
}
