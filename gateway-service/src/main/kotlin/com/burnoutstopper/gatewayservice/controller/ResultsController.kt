package com.burnoutstopper.gatewayservice.controller

import com.burnoutstopper.gatewayservice.dto.results.*
import com.burnoutstopper.gatewayservice.serivce.results.ResultsService
import io.swagger.v3.oas.annotations.security.SecurityRequirement
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.reactive.function.client.WebClient
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@RestController
@RequestMapping("/api/gateway/v1/results")
class ResultsController @Autowired constructor(private val service: ResultsService) {

    @GetMapping("/exists")
    @SecurityRequirement(name = "Authorization")
    fun exists(@RequestParam("quiz_id") quizId: Int,
               @RequestParam("test_ids") testIds: List<Int>,
               @RequestParam("respondent_id", required = false) respondentId: Int?): Mono<Boolean> {

        return service.exists(quizId, testIds, respondentId)
    }


    @GetMapping("/by-quiz")
    @SecurityRequirement(name = "Authorization")
    fun getResults(@RequestParam("quiz_id") quizId: Int,
                   @RequestParam("test_ids") testIds: List<Int>,
                   @RequestParam("respondent_id", required = false) respondentId: Int?): Mono<ResultsByQuizDTO> {

        return service.getResults(quizId, testIds, respondentId)
    }
}
