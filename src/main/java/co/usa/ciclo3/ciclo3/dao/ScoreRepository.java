/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package co.usa.ciclo3.ciclo3.dao;

import co.usa.ciclo3.ciclo3.entities.Score;
import co.usa.ciclo3.ciclo3.entities.ScoreCrud;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author guard
 */
@Repository
public class ScoreRepository {
	
  @Autowired
  private ScoreCrud scoreCrudRepository;
  
  public List<Score> getAll() {return (List<Score>) scoreCrudRepository.findAll();};
  
  public Optional<Score> getScore(int id) {return scoreCrudRepository.findById(id);};
  
  public Score save(Score score) { return scoreCrudRepository.save(score);};
  
  public void delete(Score score){ scoreCrudRepository.delete(score);};
}
