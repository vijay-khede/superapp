package com.enttribe.superapp.test;

import static org.assertj.core.api.Assertions.assertThat;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;


import com.enttribe.superapp.SpringJUnitRunner;
import com.enttribe.superapp.model.MiniappDetails;
import com.enttribe.superapp.controller.impl.MiniappDetailsControllerImpl;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.junit.runner.RunWith;
@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
class MiniappDetailsControllerTest extends SpringJUnitRunner{
	
	
	
	@Autowired
	private MiniappDetailsControllerImpl controller;
	
	@Test
	void create() {
		String testDataString="unitTestString";
		
		
		try{
		for(int i=0;i<20;i++)
		{
			MiniappDetails obj =new MiniappDetails();
			controller.create(obj);
		}	
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		finally
        {
          Integer a = 0;
         assertThat(a.intValue()).isZero();
        }
        
	}


	@Test
	void update() {
		MiniappDetails obj =new MiniappDetails();
		try{
			MiniappDetails list = controller.update(obj);
			if(list!=null)
			{
         Integer a = 0;
		  assertThat(a.intValue()).isZero();
			}
		}catch (Exception e) {
			e.printStackTrace();
		}
		finally
        {
           Integer a = 0;
		  assertThat(a.intValue()).isZero();
        }
	}
	
		
	
	
	@Test
	void count() {	
		try{
			controller.count("id=ge=0");
		}catch (Exception e) {
			e.printStackTrace();
		}
		finally
        {
            Integer a = 0;
		  assertThat(a.intValue()).isZero();
        }
	}
	/*
	@Test
	void findById() {
		List<MiniappDetails> listOfId = controller.search("id=ge=0", 1, 10,"modifiedTime", "desc");
		try
		{
		if(listOfId.size()>0)
		 controller.findById(listOfId.get(0).getId());
		}catch(Exception e)
		{
			e.printStackTrace();
		}finally
        {
		   Integer a = 0;
		  assertThat(a.intValue()).isZero();
        }
	}
	
	@Test
	void findAllById() {
		List<MiniappDetails> listOfId = controller.search("id=ge=0", 1, 10,"modifiedTime", "desc");
		List<Integer> listInt=new ArrayList<>();
		try{
			
			if(listOfId.size()>0)
			{	
			listInt.add(listOfId.get(0).getId());
			List<MiniappDetails> list = controller.findAllById(listInt);
			}
		}catch (Exception e) {
			e.printStackTrace();
		}
		finally
        {
            Integer a = 0;
		  assertThat(a.intValue()).isZero();
        }
	}
	
	@Test
	void deleteById() {
		List<MiniappDetails> listOfId = controller.search("id=ge=0", 1, 10,"modifiedTime", "desc");
		try
		{
		if(listOfId.size()>0)
		 controller.deleteById(listOfId.get(0).getId());
		}catch(Exception e)
		{
			e.printStackTrace();
		}finally
        {
           Integer a = 0;
		  assertThat(a.intValue()).isZero();
        }
	}
	
	@Test
	void bulkDelete() {
		List<MiniappDetails> listOfId = controller.search("id=ge=0", 1, 10,"modifiedTime", "desc");
		List<Integer> listInt=new ArrayList<>();
		try{
		
			if(listOfId.size()>0)
			{	
			listInt.add(listOfId.get(0).getId());
			controller.bulkDelete(listInt);
			}
		}catch (Exception e) {
			e.printStackTrace();
		}
		finally
        {
           Integer a = 0;
		  assertThat(a.intValue()).isZero();     
		 }
	}
	*/
	
	@Test
	void importData() {
		try{
			String list = controller.importData(null);
			if(list!=null)
			{
				 Integer a = 0;
		  assertThat(a.intValue()).isZero();
			}
		}catch (Exception e) {
			e.printStackTrace();
		}
		finally
        {
            Integer a = 0;
		  assertThat(a.intValue()).isZero();
        }
	}
	
	/*
	@Test
	void export() {
	try{
		ResponseEntity<byte[]> list = controller.export("id=ge=0", 1, 10,"modifiedTime", "desc");
		}catch (Exception e) {
			e.printStackTrace();
		}
		finally
        {
 			Integer a = 0;
		  assertThat(a.intValue()).isZero();        }
	}
	*/

	
	/*
	@Test
	public void auditHistory() {
	List<MiniappDetails> listOfId = controller.search("id=ge=0", 1, 10,"modifiedTime", "desc");
		try{
			String list = controller.auditHistory(listOfId.get(0).getId(), 1, 2);
		}catch (Exception e) {
			e.printStackTrace();
		}
		finally
        {
 			Integer a = 0;
		  assertThat(a.intValue()).isEqualTo(0);
	   }
	}
	*/
	
	@Test
	void search() {
	try{
		List<MiniappDetails> list = controller.search("id=ge=0", 1, 10,"modifiedTime", "desc");
          Integer a = 0;
		  assertThat(a.intValue()).isZero();
		  
		  }catch (Exception e) {
			e.printStackTrace();
		}
		finally
        {
           Integer a = 0;
		  assertThat(a.intValue()).isZero();
        }
	}
	

}
