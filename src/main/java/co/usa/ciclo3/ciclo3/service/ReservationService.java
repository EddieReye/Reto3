/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package co.usa.ciclo3.ciclo3.service;

import Custom.CountClient;
import Custom.StatusAmount;
import co.usa.ciclo3.ciclo3.dao.ReservationRepository;
import co.usa.ciclo3.ciclo3.entities.Reservation;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author guard
 */
@Service
public class ReservationService {
    
    @Autowired 
     /**
    * @param reservationRepository  Parametro 
    */
    ReservationRepository reservationRepository;
    
    /**
    *Funcion getAll
    * @return  List Reservation
    */
    public List<Reservation> getAll() {return (List<Reservation>) reservationRepository.getAll();};
  
    /**
    * Funcion getReservation 
    * @param idReservas
    * @return  Reservation
    */
    public Optional<Reservation> getReservation(int id) {return reservationRepository.getReservation(id);};
  
    /**
    * Funcion save 
    * @param reservation
    * @return  Reservation
    */
    public Reservation save(Reservation reservation) { 
        if (reservation.getIdReservation()== null){
            return reservationRepository.save(reservation);
        }
        else
        {
            Optional<Reservation> co =  reservationRepository.getReservation(reservation.getIdReservation());
            if (co.isEmpty()){
                return reservationRepository.save(reservation);
            }
            else
            {
                return reservation;
            }
        }
    }
    
    /**
    * Funcion update 
    * @param reservation
    * @return  Reservation
    */
    public Reservation update(Reservation reservation){
        if(reservation.getIdReservation()!=null){
            Optional<Reservation> option = reservationRepository.getReservation(reservation.getIdReservation());
            if(!option.isEmpty()){
                if(reservation.getStartDate()!=null){
                    option.get().setStartDate(reservation.getStartDate());
                }
                if(reservation.getDevolutionDate()!=null){
                    option.get().setDevolutionDate(reservation.getDevolutionDate());
                }

                if(reservation.getStatus()!=null){
                    option.get().setStatus(reservation.getStatus());
                }
                if(reservation.getScore()!=null){
                    option.get().setScore(reservation.getScore());
                }
                return reservationRepository.save(option.get());
            }
        }
        return reservation;
    }
    
    /**
    * Funcion deleteReservation 
    * @param idReservas
    * @return  boolean
    */
    public boolean deleteReservation(int idReservas){
        Optional<Reservation> reservation = getReservation(idReservas);
        if(!reservation.isEmpty()){
            reservationRepository.delete(reservation.get());
            return true;
        }
        return false;
	
    }
   
     public List<CountClient> getTopClients() {
           return reservationRepository.getTopClients();
	     
     }
     
     public StatusAmount getStatusReport() {
	     List<Reservation> completed=reservationRepository.getReservationByStatus("completed");
	     List<Reservation> cancelled=reservationRepository.getReservationByStatus("cancelled");
	     
	     StatusAmount statAmt=new StatusAmount(completed.size(), cancelled.size());
	     return statAmt;
     }
	   
        public List<Reservation> getReservationPeriod(String d1, String d2) {
	      
	      //YYYY-MM-DD
	      SimpleDateFormat parser=new SimpleDateFormat( "yyyy-MM-dd");
	      Date dateOne=new Date();
	      Date dateTwo= new Date();
	      try {
              dateOne=parser.parse(d1);
              dateTwo=parser.parse(d2);
	      }catch (ParseException e) {
              e.printStackTrace();
        }
	      if(dateOne.before(dateTwo)){
		return reservationRepository.getReservationPeriod(dateOne,dateTwo); 
	      }else{
	         return new ArrayList<>();
             
            }
	      
         }
	     
    }

