var participants = [];
    var drawnNumbers = [];
    var bingoCards = [];

    function addParticipant() {
      var participantName = document.getElementById("participantName").value;
      participants.push(participantName);

      var listajogadores = document.getElementById("listajogadores");
      var li = document.createElement("li");
      li.appendChild(document.createTextNode(participantName));
      listajogadores.appendChild(li);

      var bingoCard = generateBingoCard();
      bingoCards.push(bingoCard);

      var containercartelasbingo = document.getElementById("bingoCards");
      var cartelacontainerbingo = document.createElement("div");
      cartelacontainerbingo.classList.add("bingoCard");
      cartelacontainerbingo.appendChild(document.createTextNode(participantName + ": "));

      var table = document.createElement("table");
      for (var row = 0; row < 5; row++) {
        var tableRow = document.createElement("tr");
        for (var col = 0; col < 5; col++) {
          var tableCell = document.createElement("td");
          tableCell.classList.add("numerobingo");
          if (row === 2 && col === 2) {
            tableCell.classList.add("empty");
          } else {
            var number = bingoCard[row * 5 + col];
            tableCell.id = participantName + "-" + number;
            tableCell.appendChild(document.createTextNode(number));
          }
          tableRow.appendChild(tableCell);
        }
        table.appendChild(tableRow);
      }

      cartelacontainerbingo.appendChild(table);
      containercartelasbingo.appendChild(cartelacontainerbingo);

      document.getElementById("participantName").value = "";
    }

    function generateBingoCard() {
      var card = [];
      var numbers = [];

      for (var i = 1; i <= 75; i++) {
        numbers.push(i);
      }

      for (var j = numbers.length - 1; j > 0; j--) {
        var randomIndex = Math.floor(Math.random() * (j + 1));
        var temp = numbers[j];
        numbers[j] = numbers[randomIndex];
        numbers[randomIndex] = temp;
      }

      card = numbers.slice(0, 24);

      var lastRow = card.slice(20, 24);
      var lastColumn = [card[4], card[9], card[14], card[19]];
      var lastNumber = getRandomNumber(numbers.slice(25));
      card[24] = lastNumber;
      lastRow.push(lastNumber);
      lastColumn.push(lastNumber);

      return card;
    }

    function getRandomNumber(numbers) {
      var randomIndex = Math.floor(Math.random() * numbers.length);
      return numbers[randomIndex];
    }

    function startDrawing() {
      var winners = [];

      var interval = setInterval(function() {
        var randomIndex;
        var numerobingoelemento;

        do {
          randomIndex = Math.floor(Math.random() * 75) + 1;
          numerobingoelemento = document.getElementById("numerobingo" + randomIndex);
        } while (drawnNumbers.includes(randomIndex));

        drawnNumbers.push(randomIndex);

        if (numerobingoelemento) {
          numerobingoelemento.classList.add("selected");
          numerobingoelemento.classList.add("winningNumber");

          for (var i = 0; i < bingoCards.length; i++) {
            var participantName = participants[i];
            var bingoCard = bingoCards[i];
            var elementonumerodacartela = document.getElementById(participantName + "-" + randomIndex);

            if (elementonumerodacartela) {
              elementonumerodacartela.classList.add("selected");
              elementonumerodacartela.classList.add("winningNumber");
            }

            // Verificar se algum jogador completou o bingo
            var completedNumbers = 0;
            for (var j = 0; j < bingoCard.length; j++) {
              var number = bingoCard[j];
              var numberElement = document.getElementById(participantName + "-" + number);

              if (numberElement && numberElement.classList.contains("selected")) {
                completedNumbers++;
              }
            }

            if (completedNumbers === 24) {
              winners.push(participantName);
            }
          }

          if (winners.length > 0) {
            clearInterval(interval);
            alert("Bingo! O(s) ganhador(es) é(são): " + winners.join(", "));
          }
          
          // Exibir o número sorteado
          var numerobingosContainer = document.getElementById("numerobingosContainer");
          var inserirnumeroelemento = document.createElement("div");
          inserirnumeroelemento.classList.add("drawnNumber");
          inserirnumeroelemento.appendChild(document.createTextNode(randomIndex));
          numerobingosContainer.appendChild(inserirnumeroelemento);
        }
      }, 100);
    }

    function resetProgram() {
      participants = [];
      drawnNumbers = [];
      bingoCards = [];
      
      var listajogadores = document.getElementById("listajogadores");
      while (listajogadores.firstChild) {
        listajogadores.removeChild(listajogadores.firstChild);
      }
      
      var containercartelasbingo = document.getElementById("bingoCards");
      while (containercartelasbingo.firstChild) {
        containercartelasbingo.removeChild(containercartelasbingo.firstChild);
      }
      
      var numerobingoelementos = document.getElementsByClassName("numerobingo");
      for (var i = 0; i < numerobingoelementos.length; i++) {
        var numerobingoelemento = numerobingoelementos[i];
        numerobingoelemento.classList.remove("selected", "winningNumber");
      }
    }

    for (var i = 1; i <= 75; i++) {
      var numerobingoelemento = document.createElement("div");
      numerobingoelemento.id = "numerobingo" + i;
      numerobingoelemento.classList.add("numerobingo");
      numerobingoelemento.appendChild(document.createTextNode(i));
      document.body.appendChild(numerobingoelemento);
    }