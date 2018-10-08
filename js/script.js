function setup() {
    term = document.getElementById("term");
    var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    term.style.width = (width - 100) + "px";
    term.style.height = 0.9 * height + "px";

    term.appendChild(document.createElement("p"));

    document.onkeydown = onkeydown;
    document.onkeyup = onkeyup;

    type_delay = 40;
    line_delay = 600;

    main();
}

async function type(text, ms=type_delay) {
    var line = document.createElement("p");
    term.appendChild(line);

    if (ms) {
        for (var i = 0; i < text.length; i++) {
            line.innerHTML += text[i];
            await delay(ms);
        }
    } else {
        line.innerHTML = text;
    }

    term.scrollTop = term.scrollHeight;
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

is_input = 0;
finished = 0;
input_text = "";
async function input(prefix, pwd="") {
    is_input = 1;
    finished = 0;
    input_text = "";
    pwd_char = pwd;

    type(prefix, 0, 0);
    while (!finished) {
        await delay(10);
    }
}

function onkeydown(e) {
    console.log(e);

    var last_line = term.childNodes[term.childNodes.length - 1];
    if (is_input) {
        if (e.key.length == 1) {
            if (pwd_char) {
                last_line.innerHTML += pwd_char;
            } else {
                last_line.innerHTML += e.key;
            }
            input_text += e.key;
        } else if (e.key == "Backspace") {
            last_line.innerHTML = last_line.innerHTML.slice(0, last_line.innerHTML.length - 1);
            input_text = input_text.slice(0, input_text.length - 1);
        } else if (e.key == "Enter") {
            finished = 1;
        }
    }       
}

function clear() {
    while (term.firstChild) {
        term.removeChild(term.firstChild);
    }
}

async function main() {
    a = "Для продолжения введите пароль:"; type(a); await delay(a.length * type_delay + line_delay);
    correct = "1122334411";
    while (input_text != correct) {
        input("> ", "*"); while (!finished) {await delay(10)};
        if (input_text != correct) {
            term.removeChild(term.childNodes[term.childNodes.length - 1]);
        }
    }

    //text = intro; for (var line of text.split("\n")) { if (line[0] == "!") { line = line.slice(1, line.length); type(line, 0); await delay(line_delay); } else { type(line); await delay(line.length * type_delay + line_delay); } }

    a = "Привет!"; type(a); await delay(a.length * type_delay + line_delay);
    a = "Давай сыграем в простую игру. "; type(a); await delay(a.length * type_delay + line_delay);
    a = "Важно! Не закрывай и не перезагружай эту страницу, а то весь прогресс сбросится!"; type(a); await delay(a.length * type_delay + line_delay * 2);
    a = "Ты находишься в комнате с тремя дверьми - 1, 2 и 3. Какую из них ты хочешь открыть?"; type(a); await delay(a.length * type_delay + line_delay);
    a = "Напиши цифру и нажми ENTER:"; type(a); await delay(a.length * type_delay + line_delay);
    
    input("> "); while (!finished) {await delay(10)};

    cur_door = "";
    if (input_text == "1") {
        a = "Ты попробовала открыть первую дверь, но она оказалась заперта. На ней находится кодовый замок и записка:"; type(a); await delay(a.length * type_delay + line_delay);
        a = "«Ручка стоит на 10 рублей дороже карандаша, а вместе они стоят 40 рублей. Сколько стоит ручка?»"; type(a); await delay(a.length * type_delay + line_delay);
        a = "Попробуй отгадать пароль для замка и напиши его:"; type(a); await delay(a.length * type_delay + line_delay);
        
        correct = "25";
        while (input_text != correct) {
            input("> "); while (!finished) {await delay(10)};
            if (input_text != correct) {
                term.removeChild(term.childNodes[term.childNodes.length - 1]);
            }
        }

        a = "Молодец! Ты открыла первую дверь! "; type(a); await delay(a.length * type_delay + line_delay);
        key1 = 1;
        cur_door = "1";
        
        //input("> "); while (!finished) {await delay(10)};

        //if (input_text == "0") {
            //cur_door = "";
        //} else if (input_text == "1") {
            //cur_door = "11";
        //} else if (input_text == "2") {
            //cur_door = "12";
        //}
    } else if (input_text == "2") {
        a = "Вторая дверь заперта на навесной замок. Попробуй поискать ключ и вернуться сюда попозже."; type(a); await delay(a.length * type_delay + line_delay);
    } else if (input_text == "3") {
        a = "Третья дверь заперта на навесной замок. Попробуй поискать ключ и вернуться сюда попозже."; type(a); await delay(a.length * type_delay + line_delay);
    }

    found = 0;
    while (!found) {
        input_text = "";

        if (cur_door == "") {
            type("<br/>", 0);
            a = "Ты вернулась в первую комнату с тремя дверьми. "; type(a); await delay(a.length * type_delay + line_delay);
            a = "Напиши номер двери чтобы попробовать ее открыть."; type(a); await delay(a.length * type_delay + line_delay);

            input("> "); while (!finished) {await delay(10)};

            if (input_text == "1") {
                if (key1) {
                    cur_door = "1";
                } else {
                    a = "Ты попробовала открыть первую дверь, но она оказалась заперта. На ней находится кодовый замок и записка:"; type(a); await delay(a.length * type_delay + line_delay);
                    a = "«Ручка стоит на 10 рублей дороже карандаша, а вместе они стоят 40 рублей. Сколько стоит ручка?»"; type(a); await delay(a.length * type_delay + line_delay);
                    a = "Попробуй отгадать пароль для замка и напиши его:"; type(a); await delay(a.length * type_delay + line_delay);
                    
                    correct = "25";
                    while (input_text != correct) {
                        input("> "); while (!finished) {await delay(10)};
                        if (input_text != correct) {
                            term.removeChild(term.childNodes[term.childNodes.length - 1]);
                        }
                    }

                    a = "Молодец! Ты открыла первую дверь! "; type(a); await delay(a.length * type_delay + line_delay);
                    key1 = 1;
                    cur_door = "1";
                }
            } else if (input_text == "2") {
                if (!key2) {
                    if (!key) {
                        a = "Вторая дверь заперта на навесной замок. Попробуй поискать ключ и вернуться сюда попозже."; type(a); await delay(a.length * type_delay + line_delay);
                    } else { 
                        a = "Ни один из твоих ключей не подошел к этой двери. Попробуй поискать еще!"; type(a); await delay(a.length * type_delay + line_delay);
                    }
                } else {
                    a = "Замок поддался ключу и открылся."; type(a); await delay(a.length * type_delay + line_delay);
                    cur_door = "2";
                }
            } else if (input_text == "3") {
                if (!key3) {
                    if (!key) {
                        a = "Третья дверь заперта на навесной замок. Попробуй поискать ключ и вернуться сюда попозже."; type(a); await delay(a.length * type_delay + line_delay);
                    } else { 
                        a = "Ни один из твоих ключей не подошел к этой двери. Попробуй поискать еще!"; type(a); await delay(a.length * type_delay + line_delay);
                    }
                } else {
                    a = "Замок поддался ключу и открылся."; type(a); await delay(a.length * type_delay + line_delay);
                    cur_door = "3";
                }
            }
        } else if (cur_door == "1") {
            type("<br/>", 0);
            a = "Ты оказалась в комнате за самой первой дверью."; type(a); await delay(a.length * type_delay + line_delay);
            a = "Перед тобой еще две. Напиши номер двери чтобы попробовать ее открыть, или напиши «0» чтобы вернуться в предыдущую комнату."; type(a); await delay(a.length * type_delay + line_delay);
            
            input("> "); while (!finished) {await delay(10)};

            if (input_text == "0") {
                cur_door = "";
            } else if (input_text == "1") {
                if (key11) {
                    cur_door = "11";
                } else {
                    a = "Первая дверь в этой комнате тоже закрыта на кодовый замок."; type(a); await delay(a.length * type_delay + line_delay);
                    a = "Записка на нем гласит:"; type(a); await delay(a.length * type_delay + line_delay);
                    a = "«56728 × 134 : (28 - 5 × 4) - 194»"; type(a); await delay(a.length * type_delay + line_delay);
                    a = "Попробуешь отгадать код?"; type(a); await delay(a.length * type_delay + line_delay);
                        
                    correct = "950000";
                    while (input_text != correct) {
                        input("> "); while (!finished) {await delay(10)};
                        if (input_text != correct) {
                            term.removeChild(term.childNodes[term.childNodes.length - 1]);
                        }
                    }

                    a = "Молодец! Ты открыла эту дверь! "; type(a); await delay(a.length * type_delay + line_delay);
                    a = "Перед тобой еще одна комната с двумя дверьми."; type(a); await delay(a.length * type_delay + line_delay);
                    a = "Думаю, на этом моменте можно уже начать рисовать карту этого лабиринта :)"; type(a); await delay(a.length * type_delay + line_delay);
                    key11 = 1;
                    cur_door = "11";
                }
            } else if (input_text == "2") {
                if (key12) {
                    cur_door = "12";
                } else {
                    a = "Вторая дверь в этой комнате тоже закрыта на кодовый замок."; type(a); await delay(a.length * type_delay + line_delay);
                    a = "На записке сказано:"; type(a); await delay(a.length * type_delay + line_delay);
                    a = "«В каком году ты с Сашей первый раз принимала участие в Бегущем городе?»"; type(a); await delay(a.length * type_delay + line_delay);
                    a = "Думаю, тут ты точно отгадаешь код :)"; type(a); await delay(a.length * type_delay + line_delay);

                    correct = "2014";
                    while (input_text != correct) {
                        input("> "); while (!finished) {await delay(10)};
                        if (input_text != correct) {
                            term.removeChild(term.childNodes[term.childNodes.length - 1]);
                        }
                    }

                    a = "Молодец! Ты открыла и эту дверь! "; type(a); await delay(a.length * type_delay + line_delay);
                    key12 = 1;
                    cur_door = "12";

                }
            }
        } else if (cur_door == "2") {
            type("<br/>", 0);
            a = "Ты оказалась в комнате за второй дверью."; type(a); await delay(a.length * type_delay + line_delay);
            a = "Тут находятся еще три двери. Напиши номер двери чтобы попробовать ее открыть, или «0» чтобы вернуться обратно."; type(a); await delay(a.length * type_delay + line_delay);

            input("> "); while (!finished) {await delay(10)};

            if (input_text == "0") {
                cur_door = "";
            } else if (input_text == "1") {
                if (key21) {
                    cur_door = "21";
                } else {
                    a = "И в этой комнате первая дверь закрыта на кодовый замок."; type(a); await delay(a.length * type_delay + line_delay);
                    a = "Кажется, тут очередная задачка!"; type(a); await delay(a.length * type_delay + line_delay);
                    a = "«Сколько возможных четырехзначных чисел можно составить только из ечетных цифр?»"; type(a); await delay(a.length * type_delay + line_delay);
                    a = "Попробуй решить!"; type(a); await delay(a.length * type_delay + line_delay);
                        
                    correct = "625";
                    while (input_text != correct) {
                        input("> "); while (!finished) {await delay(10)};
                        if (input_text != correct) {
                            term.removeChild(term.childNodes[term.childNodes.length - 1]);
                        }
                    }

                    a = "Молодец! Решила! "; type(a); await delay(a.length * type_delay + line_delay);
                    key21 = 1;
                    cur_door = "21";
                }
            } else if (input_text == "2") {
                if (!key22) {
                    a = "Ни один из твоих ключей не подошел к этой двери. Попробуй поискать еще!"; type(a); await delay(a.length * type_delay + line_delay);
                } else {
                    a = "Замок поддался ключу и открылся."; type(a); await delay(a.length * type_delay + line_delay);
                    cur_door = "22";
                }
            } else if (input_text == "3") {
                if (!key23) {
                    a = "Ни один из твоих ключей не подошел к этой двери. Попробуй поискать еще!"; type(a); await delay(a.length * type_delay + line_delay);
                } else {
                    a = "Замок поддался ключу и открылся."; type(a); await delay(a.length * type_delay + line_delay);
                    cur_door = "23";
                }
            }

        } else if (cur_door == "3") {
            type("<br/>", 0);
            found = 1;

            a = "Ключ подошел к замку на третьей двери."; type(a); await delay(a.length * type_delay + line_delay);
            a = "За ней находятся еще четыре двери. Напиши номер двери чтобы попрбовать ее откр..."; type(a); await delay(a.length * type_delay + line_delay * 2);
            a = "Ладно, ладно, шучу! "; type(a); await delay(a.length * type_delay + line_delay);
            a = "Мамочка! "; type(a); await delay(a.length * type_delay + line_delay);
            a = "Ты прошла мой квест! "; type(a); await delay(a.length * type_delay + line_delay);
            a = "Увы, сделать физический квест у меня не было возможности, так что пришлось обходиться виртуальным :)"; type(a); await delay(a.length * type_delay + line_delay);
            a = "С Днем рождения!!! "; type(a); await delay(a.length * type_delay + line_delay);
            a = "У тебя сегодня, можно сказать, день отдыха - занятия как раз прошли :)"; type(a); await delay(a.length * type_delay + line_delay);
            a = "В общем, мур-мур, мяу-мяу! Можешь мне позвонить, когда это прочитаешь :)"; type(a); await delay(a.length * type_delay + line_delay);
            a = "(только не давай Ване смотреть на исходный код этого квеста)"; type(a); await delay(a.length * type_delay + line_delay);
            a = "Мяу!"; type(a); await delay(a.length * type_delay + line_delay);
        } 

        else if (cur_door == "11") {
            type("<br/>", 0);
            a = "Ты в комнате c двумя дверьми. "; type(a); await delay(a.length * type_delay + line_delay);
            a = "Напиши номер двери чтобы ее открыть или «0» чтобы вернуться."; type(a); await delay(a.length * type_delay + line_delay);

            input("> "); while (!finished) {await delay(10)};

            if (input_text == "0") {
                cur_door = "1";
            } else if (input_text == "1") {
                if (!key111) {
                    if (!key) {
                        a = "Первая дверь заперта на навесной замок. Попробуй поискать ключ и вернуться сюда попозже."; type(a); await delay(a.length * type_delay + line_delay);
                    } else { 
                        a = "Ни один из твоих ключей не подошел к этой двери. Попробуй поискать еще!"; type(a); await delay(a.length * type_delay + line_delay);
                    }
                } else {
                    a = "Замок поддался ключу и открылся."; type(a); await delay(a.length * type_delay + line_delay);
                    cur_door = "111";
                }
            } else if (input_text == "2") {
                if (!key112) {
                    if (!key) {
                        a = "Вторая дверь заперта на навесной замок. Попробуй поискать ключ и вернуться сюда попозже."; type(a); await delay(a.length * type_delay + line_delay);
                    } else { 
                        a = "Ни один из твоих ключей не подошел к этой двери. Попробуй поискать еще!"; type(a); await delay(a.length * type_delay + line_delay);
                    }
                } else {
                    a = "Замок поддался ключу и открылся."; type(a); await delay(a.length * type_delay + line_delay);
                    cur_door = "112";
                }
            }
        } else if (cur_door == "12") {
            type("<br/>", 0);
            cur_door = "1";
            if (key2) {
                a = "Ты вошла в комнату с пустым столом."; type(a); await delay(a.length * type_delay + line_delay);
                a = "Ключ из этой комнаты ты уже взяла."; type(a); await delay(a.length * type_delay + line_delay);
            } else {
                a = "Ты вошла в комнату без дверей со столом посередине."; type(a); await delay(a.length * type_delay + line_delay);
                a = "На столе лежит ключ от какого-то замка. "; type(a); await delay(a.length * type_delay + line_delay);
                a = "Попробуй использовать его чтобы открыть другие двери!"; type(a); await delay(a.length * type_delay + line_delay);
                key2 = 1;
            }
        }
        
        else if (cur_door == "21") {
            type("<br/>", 0);
            cur_door = "2";
            if (key111) {
                a = "Ты вошла в комнату с пустым столом."; type(a); await delay(a.length * type_delay + line_delay);
                a = "Ключ из этой комнаты ты уже взяла."; type(a); await delay(a.length * type_delay + line_delay);
            } else {
                a = "Ты вошла в комнату без дверей со столом посередине."; type(a); await delay(a.length * type_delay + line_delay);
                a = "На столе лежит ключ от какого-то замка. "; type(a); await delay(a.length * type_delay + line_delay);
                a = "Попробуй использовать его чтобы открыть другие двери!"; type(a); await delay(a.length * type_delay + line_delay);
                key111 = 1;
            }
        } else if (cur_door == "22") {
            type("<br/>", 0);
            cur_door = "2";
            if (key112) {
                a = "Ты вошла в комнату с пустым столом."; type(a); await delay(a.length * type_delay + line_delay);
                a = "Ключ из этой комнаты ты уже взяла."; type(a); await delay(a.length * type_delay + line_delay);
            } else {
                a = "Ты вошла в комнату без дверей со столом посередине."; type(a); await delay(a.length * type_delay + line_delay);
                a = "На столе лежит ключ от какого-то замка. "; type(a); await delay(a.length * type_delay + line_delay);
                a = "Попробуй использовать его чтобы открыть другие двери!"; type(a); await delay(a.length * type_delay + line_delay);
                key112 = 1;
            }
        } else if (cur_door == "23") {
            type("<br/>", 0);
            cur_door = "2";
            if (key3) {
                a = "Ты вошла в комнату с пустым столом."; type(a); await delay(a.length * type_delay + line_delay);
                a = "Ключ из этой комнаты ты уже взяла."; type(a); await delay(a.length * type_delay + line_delay);
            } else {
                a = "Ты вошла в комнату без дверей со столом посередине."; type(a); await delay(a.length * type_delay + line_delay);
                a = "На столе лежит ключ от какого-то замка. "; type(a); await delay(a.length * type_delay + line_delay);
                a = "Попробуй использовать его чтобы открыть другие двери!"; type(a); await delay(a.length * type_delay + line_delay);
                key3 = 1;
            }
        } else if (cur_door == "111") {
            type("<br/>", 0);
            cur_door = "11";
            if (key22) {
                a = "Ты вошла в комнату с пустым столом."; type(a); await delay(a.length * type_delay + line_delay);
                a = "Ключ из этой комнаты ты уже взяла."; type(a); await delay(a.length * type_delay + line_delay);
            } else {
                a = "Ты вошла в комнату без дверей со столом посередине."; type(a); await delay(a.length * type_delay + line_delay);
                a = "На столе лежит ключ от какого-то замка. "; type(a); await delay(a.length * type_delay + line_delay);
                a = "Попробуй использовать его чтобы открыть другие двери!"; type(a); await delay(a.length * type_delay + line_delay);
                key22 = 1;
            }
        } else if (cur_door == "112") {
            type("<br/>", 0);
            cur_door = "11";
            if (key23) {
                a = "Ты вошла в комнату с пустым столом."; type(a); await delay(a.length * type_delay + line_delay);
                a = "Ключ из этой комнаты ты уже взяла."; type(a); await delay(a.length * type_delay + line_delay);
            } else {
                a = "Ты вошла в комнату без дверей со столом посередине."; type(a); await delay(a.length * type_delay + line_delay);
                a = "На столе лежит ключ от какого-то замка. "; type(a); await delay(a.length * type_delay + line_delay);
                a = "Попробуй использовать его чтобы открыть другие двери!"; type(a); await delay(a.length * type_delay + line_delay);
                key23 = 1;
            }
        }
    }
    
}

key = 0;
key1 = 0;
key11 = 0;
key111 = 0;
key112 = 0;
key12 = 0;
key2 = 0;
key21 = 0;
key22 = 0;
key23 = 0;
key3 = 0;


