CREATE TABLE IF NOT EXISTS results
(
    id                        BIGSERIAL PRIMARY KEY,
    respondent_id             INT                      NOT NULL,
    quiz_id                   INT,
    date_time                 TIMESTAMP WITH TIME ZONE NOT NULL,
    catastrophizing           INT                      NOT NULL,
    duty_to_self              INT                      NOT NULL,
    duty_to_others            INT                      NOT NULL,
    low_frustration_tolerance INT                      NOT NULL,
    self_esteem               INT                      NOT NULL,
    answers                   VARCHAR                  NOT NULL
);
