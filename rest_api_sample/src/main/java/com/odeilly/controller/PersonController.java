package com.odeilly.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.odeilly.domain.Person;

@RestController
@RequestMapping("/persons")
public class PersonController {

	@GetMapping(path = "/getSamplePerson")
	public Person getSamplePerson() {
		var person = new Person();
		person.setAge(50);;
		person.setName("Odeilly");
		return person;
	}
}
