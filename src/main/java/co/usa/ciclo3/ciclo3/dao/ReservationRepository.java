/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package co.usa.ciclo3.ciclo3.dao;

import Custom.CountClient;
import co.usa.ciclo3.ciclo3.entities.Client;
import co.usa.ciclo3.ciclo3.entities.Reservation;
import co.usa.ciclo3.ciclo3.entities.ReservationCrud;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author guard
 */
@Repository
public class ReservationRepository {
    
    @Autowired
  private ReservationCrud reservationCrudRepository;
  
  public List<Reservation> getAll() {return (List<Reservation>) reservationCrudRepository.findAll();};
  
  public Optional<Reservation> getReservation(int id) {return reservationCrudRepository.findById(id);};
  
  public Reservation save(Reservation reservation) { return reservationCrudRepository.save(reservation);};
  
  public void delete(Reservation reservation){ reservationCrudRepository.delete(reservation);};
    
  public List<Reservation> getReservationByStatus(String status) {
	 return reservationCrudRepository.findAllByStatus(status); 
  }
  
  public List<Reservation> getReservationPeriod(Date dateOne, Date dateTwo) {
	  return reservationCrudRepository.findAllByStartDateAfterAndStartDateBefore(dateOne,dateTwo);
  }
  
  public List<CountClient> getTopClients() {
	  List<CountClient> res=new ArrayList<>();
	  List<Object[]> report=reservationCrudRepository.countTotalReservationByClient();
	  for(int i=0;i<report.size();i++) {
		  /*
		  Client c=(Client) report.get(i)[0];
	  	  Long cantidad= (Long) report.get(i)[1];
	  	  CountClient cc=new CountClient(cantidad,c);
	  	  res.add(cc);
		  */
		  res.add(new CountClient((Long)report.get(i)[1],(Client)report.get(i)[0]));
	  }
	  return res;
  }
}
