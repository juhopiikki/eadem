package com.eadem.mental.controller;

import java.util.UUID;

import com.eadem.mental.wrappers.UserDescription;
import org.springframework.web.bind.annotation.*;

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

  @GetMapping("/random/id")
  public String randomId() {
    return UUID.randomUUID().toString();
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

  @PostMapping("/users/create")
  public boolean createUsers(
      @RequestBody Users user
  ) {
    if (user != null) {
      return user.create();
    }
    return false;
  }

  @PostMapping("/users/getById")
  public Users GetUser(
      @RequestBody UUID userid
  ) {
    return Users.getById(userid);
  }

  @PostMapping("/users/updateDescription")
  public boolean UpdateDescription(
      @RequestBody UserDescription userDescription
  ) {
    return Users.updateDescription(userDescription);
  }

  @PostMapping("/saved/create")
  public boolean createSaved(
      @RequestBody Saved saved
  ) {
    if (saved != null) {
      return saved.create();
    }
    return false;
  }

  @PostMapping("/record/create")
  public boolean createRecord(
      @RequestBody Record record
  ) {
    if (record != null) {
      return record.create();
    }
    return false;
  }

}
