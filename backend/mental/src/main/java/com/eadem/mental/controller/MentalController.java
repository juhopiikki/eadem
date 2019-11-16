package com.eadem.mental.controller;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

import com.eadem.mental.wrappers.CreateRecord;
import com.eadem.mental.wrappers.UserDescription;
import com.eadem.mental.wrappers.UserName;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.eadem.mental.entities.Files;
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
  public UUID createUsers(
      @RequestBody Users user
  ) {
    if (user != null) {
      if (user.create()) {
        return user.usersid;
      }
    }
    return null;
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

  @PostMapping("/users/updateName")
  public boolean UpdateName(
      @RequestBody UserName userName
  ) {
    return Users.updateUserName(userName);
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

  @PostMapping("/saved/getTop")
  public List<Saved> getTopSaved(
    @RequestBody int count
  ) {
    return Saved.getTop(count);
  }

  @PostMapping("/saved/getSaved")
  public List<Record> createSaved(
    @RequestBody UUID userid
  ) {
    return Saved.getByUserId(userid);
  }

  @PostMapping("/saved/delete")
  public boolean deleteSaved(
      @RequestBody UUID savedid
  ) {
    return Saved.delete(savedid);
  }

  @PostMapping("/record/create")
  public UUID createRecord(
      @RequestBody CreateRecord record
  ) {
    if (record != null) {
      final Record tmp = new Record();
      tmp.filesid = record.filesid;
      tmp.title = record.title;
      if (tmp.create()) {
        return tmp.recordid;
      }
    }
    return null;
  }

  @PostMapping("/record/likeIncrease")
  public boolean increaseLikeCounter(
          @RequestBody UUID recordid
  ) {
    return Record.increaseLikeCounter(recordid);
  }

  @PostMapping("/record/getTop")
  public List<Record> getTop(
          @RequestBody int count
  ) {
    return Record.getTop(count);
  }

  @PostMapping("/record/getById")
  public Record GetRecord(
      @RequestBody UUID recordid
  ) {
    return Record.getById(recordid);
  }

  @PostMapping("/record/getByUserId")
  public List<Record> GetRecordByUserId(
      @RequestBody UUID userid
  ) {
    return Record.getByUserId(userid);
  }

  @PostMapping("/record/deleteById")
  public boolean DeleteRecord(
    @RequestBody UUID recordid
  ) {
    return Record.delete(recordid);
  }

  @GetMapping(
      value = "/file/{filesid}",
      produces = MediaType.IMAGE_PNG_VALUE
  )
  public @ResponseBody byte[] getFile(
    @PathVariable("filesid") UUID filesId
  ) {
    final Files file = Files.getById(filesId);
    if (file != null) {
      return file.data;
    }
    return null;
  }

  @RequestMapping(value = "/file/upload", method = RequestMethod.POST, consumes = { "multipart/form-data" })
  public String uploadFile(
      @RequestParam("audiofile") MultipartFile mFile
  ) {
    final Files file = new Files();
    try {
      file.data = mFile.getBytes();
      if (file.create()) {
        return file.filesid.toString();
      }
    } catch (IOException e) {
      e.printStackTrace();
    }
    return null;
  }
}
