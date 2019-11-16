package com.eadem.mental.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eadem.mental.entities.Record;
import com.eadem.mental.entities.Saved;
import com.eadem.mental.entities.Users;

@RestController
@CrossOrigin
@RequestMapping("mental")
public class MentalController {

  public MentalController() { }

  @GetMapping("/status")
  public String serverStatus() {
    return "ok";
  }

  @GetMapping("/random/record")
  public Record randomRecord() {
    return Record.getRandom();
  }

  @GetMapping("/random/saved")
  public Saved randomSaved() {
    return Saved.getRandom();
  }

  @GetMapping("/random/users")
  public Users randomUsers() {
    return Users.getRandom();
  }

}
