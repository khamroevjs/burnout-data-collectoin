package com.burnoutstopper.copingservice.controller

import com.burnoutstopper.copingservice.dto.page.PageDTO
import com.burnoutstopper.copingservice.dto.results.ResultsIdResponseDTO
import com.burnoutstopper.copingservice.dto.results.ResultsResponseDTO
import com.burnoutstopper.copingservice.exception.NoSuchElementFoundException
import com.burnoutstopper.copingservice.service.result.ResultService
import io.swagger.v3.oas.annotations.security.SecurityRequirement
import jakarta.validation.constraints.Max
import jakarta.validation.constraints.Min
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/coping/v1/results")
class ResultController @Autowired constructor(private val resultService: ResultService) {

    private val log = LoggerFactory.getLogger(RestController::class.java)

    @GetMapping
    fun getResultsByToken(
            @RequestParam token: String,
            @RequestParam(defaultValue = "0") @Min(0) page: Int,
            @RequestParam(defaultValue = "10") @Min(1) @Max(100) size: Int,
    ): PageDTO<ResultsResponseDTO> {
        log.info(token, page, size)
        val response = resultService.getResultsByToken(token, page, size)
        log.info(response.toString())
        return response
    }

    @GetMapping("/{id}")
    @SecurityRequirement(name = "Authorization")
    fun getResultById(@PathVariable("id") id: Long): ResponseEntity<ResultsIdResponseDTO> {
        try {
            val result = resultService.getResultById(id)
            return ResponseEntity(result, HttpStatus.OK)
        } catch (e: NoSuchElementFoundException) {
            log.error(e.message)
        }
        return ResponseEntity(null, HttpStatus.NOT_FOUND)
    }

    @GetMapping("/by-quiz")
    @SecurityRequirement(name = "Authorization")
    fun getResultsByQuizId(@RequestParam("quiz_id") quizId: Int,
                           @RequestParam("respondent_id", required = false) respondentId: Int?): List<ResultsIdResponseDTO> {

        val response = resultService.getByQuizAndRespondent(quizId, respondentId)
        log.info(response.toString())
        return response
    }

    @GetMapping("/exists")
    @SecurityRequirement(name = "Authorization")
    fun exists(@RequestParam("quiz_id") quizId: Int,
               @RequestParam("respondent_id", required = false) respondentId: Int?): Boolean {
        return resultService.existsByQuizAndRespondent(quizId, respondentId)
    }
}
