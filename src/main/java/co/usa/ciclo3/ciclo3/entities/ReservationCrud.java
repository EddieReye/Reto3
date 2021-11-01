/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package co.usa.ciclo3.ciclo3.entities;

import java.util.Date;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author guard
 */
@Repository
public interface ReservationCrud extends CrudRepository<Reservation, Integer> {
 
//JPQL	
@Query("select c.client, COUNT(c.client) from Reservation AS c group by c.client order by COUNT(c.client) desc")	
public List<Object[]> countTotalReservationByClient();
	
 public List<Reservation> findAllByStartDateAfterAndStartDateBefore(Date dateOne,Date dateTwo);
 
 public List<Reservation> findAllByStatus(String status);
 
 
}
