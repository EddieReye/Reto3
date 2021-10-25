/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package co.usa.ciclo3.ciclo3.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.persistence.Table;

/**
 *
 * @author guard
 */
@Entity
@Table (name="score")
public class Score implements Serializable {
	
	@Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer id_score;
    private Integer sco;
    private String messa;
    
    
    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "reservation_id")
    @JsonIgnoreProperties("score")
    private Reservation reservation;
    
    public Score() {}
 

    /*
    @OneToOne
    @JoinColumn(name = "reservation_id")
    private Reservation reservation;*/

	public Integer getId_score() {
		return id_score;
	}

	public void setId_score(Integer id_score) {
		this.id_score = id_score;
	}

	public Integer getSco() {
		return sco;
	}

	public void setSco(Integer sco) {
		this.sco = sco;
	}

	public String getMessa() {
		return messa;
	}

	public void setMessa(String messa) {
		this.messa = messa;
	}

	public Reservation getReservation() {
		return reservation;
	}

	public void setReservation(Reservation reservation) {
		this.reservation = reservation;
	}
	
    
}
