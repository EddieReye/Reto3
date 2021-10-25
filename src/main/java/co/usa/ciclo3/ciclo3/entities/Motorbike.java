package co.usa.ciclo3.ciclo3.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 *
 * @author guard
 */
@Entity
@Table (name="motorbike")
public class Motorbike implements Serializable {
    
     /**
    * @param id  Parametro tabla Moto
    */
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer id;
    
    /**
    * @param name  Parametro tabla Moto
    */
    private String name;
    
    /**
    * @param brand  Parametro tabla Moto
    */
    private String brand;
    
    /**
    * @param year  Parametro tabla Moto
    */
    private Integer year;
    
    /**
    * @param description  Parametro tabla Moto
    */
    private String description;
    
    
    @ManyToOne
    @JoinColumn(name="category_id")
    @JsonIgnoreProperties({"motorbikes","client"})
    
    /**
    * @param category Parametro tabla Moto
    */
    private Category category;
    
    
    @OneToMany(cascade = {CascadeType.PERSIST},mappedBy = "motorbike")
    @JsonIgnoreProperties({"motorbike","client"})
    
    /**
    * @param messages  Parametro tabla Moto
    */
    public List<Message> messages;
    
    
    @OneToMany(cascade = {CascadeType.PERSIST},mappedBy = "motorbike")
    @JsonIgnoreProperties({"motorbike","reservations","client"})
    
    /**
    * @param reservations  Parametro tabla Moto
    */
    public List<Reservation> reservations;
    
    /**
    *Metodo getId
    * @return  Integer con el resultado de la busqueda
    */
    public Integer getId() {
        return id;
    }

    /**
    * Metodo setId 
    * @param id
    */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
    *Metodo getName
    * @return  String con el resultado de la busqueda
    */
    public String getName() {
        return name;
    }

    /**
    * Metodo setName 
    * @param name
    */
    public void setName(String name) {
        this.name = name;
    }

    /**
    *Metodo getBrand
    * @return  String con el resultado de la busqueda
    */
    public String getBrand() {
        return brand;
    }

    /**
    * Metodo setBrand 
    * @param brand
    */
    public void setBrand(String brand) {
        this.brand = brand;
    }

    /**
    *Metodo getYear
    * @return  Integer con el resultado de la busqueda
    */
    public Integer getYear() {
        return year;
    }

    /**
    * Metodo setYear 
    * @param year
    */
    public void setYear(Integer year) {
        this.year = year;
    }

    /**
    *Metodo getDescription
    * @return  String con el resultado de la busqueda
    */
    public String getDescription() {
        return description;
    }

    /**
    * Metodo setDescription 
    * @param description
    */
    public void setDescription(String description) {
        this.description = description;
    }

    /**
    *Metodo getCategory
    * @return  Category con el resultado de la busqueda
    */
    public Category getCategory() {
        return category;
    }

    /**
    * Metodo setCategory 
    * @param category
    */
    public void setCategory(Category category) {
        this.category = category;
    }

    /**
    *Metodo getMessages
    * @return  List Message
    */
    public List<Message> getMessages() {
        return messages;
    }

    /**
    * Metodo setMessages 
    * @param messages
    */
    public void setMessages(List<Message> messages) {
        this.messages = messages;
    }

    /**
    *Metodo getReservations
    * @return  List Reservation con el resultado de la busqueda
    */
    public List<Reservation> getReservations() {
        return reservations;
    }

    /**
    * Metodo setReservations
    * @param reservations
    */
    public void setReservations(List<Reservation> reservations) {
        this.reservations = reservations;
    }
   
}
