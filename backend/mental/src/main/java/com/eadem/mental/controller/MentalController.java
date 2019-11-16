package com.eadem.mental.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import com.eadem.mental.wrappers.CreateRecord;
import com.eadem.mental.wrappers.RecordWithUsers;
import com.eadem.mental.wrappers.UserDescription;
import com.eadem.mental.wrappers.UserName;
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
  public RecordWithUsers randomRecord() {
    final RecordWithUsers rwu = new RecordWithUsers();
    rwu.record = Record.getRandom();
    if (rwu.record != null && rwu.record.usersid != null) {
      final Users u = Users.getById(rwu.record.usersid);
      if (u != null) {
        rwu.user = u;
      }
    }
    return rwu;
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
  public List<RecordWithUsers> createSaved(
    @RequestBody UUID userid
  ) {
    final List<Record> records
        = Saved.getByUserId(userid);
    final List<RecordWithUsers> tmpList
        = new ArrayList<>();
    for (Record record : records) {
      final RecordWithUsers tmp
          = new RecordWithUsers();
      tmp.record = record;
      if (record.usersid != null) {
        tmp.user = Users.getById(record.usersid);
      }
      tmpList.add(tmp);
    }
    return tmpList;
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
      tmp.usersid = record.usersid;
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
  public List<RecordWithUsers> getTop(
          @RequestBody int count
  ) {
    final List<Record> records
        = Record.getTop(count);
    final List<RecordWithUsers> tmpList
        = new ArrayList<>();
    for (Record record : records) {
      final RecordWithUsers tmp
          = new RecordWithUsers();
      tmp.record = record;
      if (record.usersid != null) {
        tmp.user = Users.getById(record.usersid);
      }
      tmpList.add(tmp);
    }
    return tmpList;
  }

  @PostMapping("/record/getById")
  public RecordWithUsers GetRecord(
      @RequestBody UUID recordid
  ) {
    final RecordWithUsers rwu = new RecordWithUsers();
    rwu.record = Record.getById(recordid);
    if (rwu.record != null && rwu.record.usersid != null) {
      final Users u = Users.getById(rwu.record.usersid);
      if (u != null) {
        rwu.user = u;
      }
    }
    return rwu;
  }

  @PostMapping("/record/getByUserId")
  public List<RecordWithUsers> GetRecordByUserId(
      @RequestBody UUID userid
  ) {
    final List<Record> records
        = Record.getByUserId(userid);
    final List<RecordWithUsers> tmpList
        = new ArrayList<>();
    for (Record record : records) {
      final RecordWithUsers tmp
          = new RecordWithUsers();
      tmp.record = record;
      if (record.usersid != null) {
        tmp.user = Users.getById(record.usersid);
      }
      tmpList.add(tmp);
    }
    return tmpList;
  }

  @PostMapping("/record/deleteById")
  public boolean DeleteRecord(
    @RequestBody UUID recordid
  ) {
    return Record.delete(recordid);
  }

  @GetMapping(
      value = "/file/{filesid}",
      produces = "audio/aac"
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
