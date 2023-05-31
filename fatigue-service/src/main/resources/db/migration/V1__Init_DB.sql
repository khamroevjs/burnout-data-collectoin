CREATE TABLE IF NOT EXISTS results
(
    id                   BIGSERIAL PRIMARY KEY,
    respondent_id        INT                      NOT NULL,
    quiz_id              INT,
    date_time            TIMESTAMP WITH TIME ZONE NOT NULL,
    fatigue_index        INTEGER                  NOT NULL,
    physical_discomfort  INTEGER                  NOT NULL,
    cognitive_discomfort INTEGER                  NOT NULL,
    emotional_violation  INTEGER                  NOT NULL,
    motivation_decrease  INTEGER                  NOT NULL,
    answers              VARCHAR                  NOT NULL
);
