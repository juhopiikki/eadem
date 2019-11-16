package com.eadem.mental.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("admin")
public class MentalController {
  public MentalController() { }
  /**
   * @return Always returns ok
   */
  @GetMapping("/status")
  public String serverStatus() {
	return "ok";
  }
}
