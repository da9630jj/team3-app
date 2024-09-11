package com.green.team3_app.patie.controller;

import com.green.team3_app.patie.service.PatieService;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/partie")
public class PatieController {
    @Resource(name = "patieService")
    private PatieService partieService;
}
