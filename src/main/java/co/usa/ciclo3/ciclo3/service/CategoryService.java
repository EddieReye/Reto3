/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package co.usa.ciclo3.ciclo3.service;

import co.usa.ciclo3.ciclo3.dao.CategoryRepository;
import co.usa.ciclo3.ciclo3.entities.Category;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author guard
 */
@Service
public class CategoryService {
    
    @Autowired
    CategoryRepository categoryRepository;
    
    public List<Category> getAll() {return (List<Category>) categoryRepository.getAll();};
  
    public Optional<Category> getCategory(int id) {return categoryRepository.getCategory(id);};
  
    public Category save(Category category) { 
        if (category.getId()== null){
            return categoryRepository.save(category);
        }
        else
        {
            Optional<Category> co =  categoryRepository.getCategory(category.getId());
            if (co.isEmpty()){
                return categoryRepository.save(category);
            }
            else
            {
                return category;
            }
        }
 
    }
    
    
    public Category update(Category c){
        if(c.getId()!=null){
            Optional<Category>g=categoryRepository.getCategory(c.getId());
            if(!g.isEmpty()){
                if(c.getName()!=null){
                    g.get().setName(c.getName());
                }
                if(c.getDescription()!=null){
                    g.get().setDescription(c.getDescription());
                }
                return categoryRepository.save(g.get());

            }
        }
        return c;

    }

    public boolean deleteCategory(int id){
        Optional<Category> c=getCategory(id);
        if(!c.isEmpty()){
            categoryRepository.delete(c.get());
            return true;
        }
        return false;

    }
}
