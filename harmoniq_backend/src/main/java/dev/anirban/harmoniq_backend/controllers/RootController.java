package dev.anirban.harmoniq_backend.controllers;

import dev.anirban.harmoniq_backend.constants.UrlConstants;
import dev.anirban.harmoniq_backend.dto.common.ResponseWrapper;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RootController {

    // This is the root public api endpoints for testing purposes
    @GetMapping(UrlConstants.PUBLIC_ROUTE)
    public ResponseWrapper<Void> handlePublicRequest() {
        return new ResponseWrapper<>("Hello Welcome to Harmoniq Backend Public Root URL", null);
    }

    // This is the root private api endpoints for testing purposes
    @GetMapping(UrlConstants.PRIVATE_ROUTE)
    public ResponseWrapper<Void> handlePrivateRequest() {
        return new ResponseWrapper<>("Hello Welcome to Harmoniq Backend private root URL", null);
    }
}