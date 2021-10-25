/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package co.usa.ciclo3.ciclo3.service;

import co.usa.ciclo3.ciclo3.dao.ScoreRepository;
import co.usa.ciclo3.ciclo3.entities.Score;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author guard
 */
@Service
public class ScoreService {
    
   @Autowired
    ScoreRepository scoreRepository;
    
    public List<Score> getAll() {return (List<Score>) scoreRepository.getAll();};
  
    public Optional<Score> getScore(int id) {return scoreRepository.getScore(id);};
    
    public Score save(Score score) { 
        if (score.getId_score()== null){
            return scoreRepository.save(score);
        }
        else
        {
            Optional<Score> co =  scoreRepository.getScore(score.getId_score());
            if (co.isEmpty()){
                return scoreRepository.save(score);
            }
            else
            {
                return score;
            }
        }
 
    }
    
    public Score update(Score c){
        if(c.getId_score()!=null){
            Optional<Score>g=scoreRepository.getScore(c.getId_score());
            if(!g.isEmpty()){
                if(c.getSco()!=null){
                    g.get().setSco(c.getSco());
                }
                if(c.getMessa()!=null){
                    g.get().setMessa(c.getMessa());
                }
                return scoreRepository.save(g.get());
            }
        }
        return c;

    }

    public boolean deleteScore(int id){
        Optional<Score> c=getScore(id);
        if(!c.isEmpty()){
            scoreRepository.delete(c.get());
            return true;
        }
        return false;

    }	
    
}
