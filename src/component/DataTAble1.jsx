
import React from "react";
import DataTable, { createTheme } from "react-data-table-component";
createTheme("solarized", {
  text: {
    primary: "#268bd2",
    secondary: "#2aa198"
  },
  background: {
    default: "#002b36"
  },
  context: {
    background: "#cb4b16",
    text: "#FFFFFF"
  },
  divider: {
    default: "#073642"
  },
  action: {
    button: "rgba(0,0,0,.54)",
    hover: "rgba(0,0,0,.08)",
    disabled: "rgba(0,0,0,.12)"
  }
});

export default function App() {
  const columns = [
    {
      name: "Player ID",
      selector: (row) => row.PlayerID,
      sortable: true
    },
    {
      name: "Player Name",
      selector: (row) => row.PlayerName,
      sortable: true
    },{
      name: "Player Image",
      selector: (row) => <img className="mt-1" src={row.PlayerImage} alt="MDN logo" />,
       
    },
    {
      name: "Team",
      selector: (row) => row.Team,
      sortable: true
    },
    {
      name: "Team Image",
      selector: (row) => <img src={row.TeamImage} alt="MDN logo" />,
      sortable: true
    },
    {
      name: "Country",
      selector: (row) => row.Country,
      sortable: true
    },
    {
      name: "CountryImage",
      selector: (row) => (
        <img src={row.CountryImage} width="50%" height="50%" />
      ),
      sortable: true
    },
    {
      name: "Position",
      selector: (row) => row.Position,
      sortable: true
    },
    {
      name: "Goals",
      selector: (row) => row.Goals,
      sortable: true
    },
    {
      name: "Apps",
      selector: (row) => row.Apps,
      sortable: true
    },
    {
      name: "Top 10 Games",
      selector: (row) => {
        let arrayData = [];
        let count = 0
        gamePerformance.forEach((element) => {
          if (row.PlayerID === element.PlayerID) {
            count++;
            console.log(row.PlayerID, count)
            arrayData.push(element.Value);
          }
        });
        return
      }
    }
  ];

  const playerSummary = [
    {
      PlayerID: 1,
      PlayerName: "Aaron Ramsey",
      PlayerImage:
        "https://resources.premierleague.com/premierleague/photos/players/40x40/p447715.png",
      Team: "Aston Villa",
      TeamImage:
        "https://resources.premierleague.com/premierleague/badges/50/t7.png",
      Country: "Jamaica",
      CountryImage:
        "https://www.countryflags.com/wp-content/uploads/jamaica-flag-png-large.png",
      Position: "MID",
      Goals: 22,
      Apps: 23
    },
    {
      PlayerID: 2,
      PlayerName: "Alex Telles",
      PlayerImage:
        "https://resources.premierleague.com/premierleague/photos/players/40x40/p152590.png",
      Team: "Manchester United",
      TeamImage:
        "https://resources.premierleague.com/premierleague/badges/50/t1.png",
      Country: "Brazil",
      CountryImage:
        "https://www.countryflags.com/wp-content/uploads/brazil-flag-png-large.png",
      Position: "DEF",
      Goals: 21,
      Apps: 10
    },
    {
      PlayerID: 3,
      PlayerName: "Allan",
      PlayerImage:
        "https://resources.premierleague.com/premierleague/photos/players/40x40/p119765.png",
      Team: "Everton",
      TeamImage:
        "https://resources.premierleague.com/premierleague/badges/50/t11.png",
      Country: "England",
      CountryImage:
        "https://www.countryflags.com/wp-content/uploads/england-flag-jpg-xl.jpg",
      Position: "MID",
      Goals: 30,
      Apps: 23
    },
    {
      PlayerID: 4,
      PlayerName: "Dele Alli",
      PlayerImage:
        "https://resources.premierleague.com/premierleague/photos/players/40x40/p108823.png",
      Team: "Spurs",
      TeamImage:
        "https://resources.premierleague.com/premierleague/badges/50/t6.png",
      Country: "Brazil",
      CountryImage:
        "https://www.countryflags.com/wp-content/uploads/brazil-flag-png-large.png",
      Position: "MID",
      Goals: 3,
      Apps: 27
    },
    {
      PlayerID: 5,
      PlayerName: "Leon Bailey",
      PlayerImage:
        "https://resources.premierleague.com/premierleague/photos/players/40x40/p215711.png",
      Team: "Aston Villa",
      TeamImage:
        "https://resources.premierleague.com/premierleague/badges/50/t7.png",
      Country: "Jamaica",
      CountryImage:
        "https://www.countryflags.com/wp-content/uploads/jamaica-flag-png-large.png",
      Position: "FWD",
      Goals: 29,
      Apps: 30
    },
    {
      PlayerID: 6,
      PlayerName: "Bernando Silva",
      PlayerImage:
        "https://resources.premierleague.com/premierleague/photos/players/40x40/p165809.png",
      Team: "Manchester City",
      TeamImage:
        "https://resources.premierleague.com/premierleague/badges/50/t43.png",
      Country: "Portugal",
      CountryImage:
        "https://www.countryflags.com/wp-content/uploads/portugal-flag-400.png",
      Position: "MID",
      Goals: 5,
      Apps: 15
    },
    {
      PlayerID: 7,
      PlayerName: "Willy Boly",
      PlayerImage:
        "https://resources.premierleague.com/premierleague/photos/players/40x40/p90585.png",
      Team: "Wolves",
      TeamImage:
        "https://resources.premierleague.com/premierleague/badges/50/t39.png",
      Country: "Cote D’Ivoire",
      CountryImage:
        "https://www.countryflags.com/wp-content/uploads/cote-d-ivoire-flag-png-large.png",
      Position: "DEF",
      Goals: 26,
      Apps: 16
    },
    {
      PlayerID: 8,
      PlayerName: "Bruno Fernandes",
      PlayerImage:
        "https://resources.premierleague.com/premierleague/photos/players/40x40/p141746.png",
      Team: "Manchester United",
      TeamImage:
        "https://resources.premierleague.com/premierleague/badges/50/t1.png",
      Country: "Portugal",
      CountryImage:
        "https://www.countryflags.com/wp-content/uploads/portugal-flag-400.png",
      Position: "MID",
      Goals: 23,
      Apps: 2
    },
    {
      PlayerID: 9,
      PlayerName: "Edinson Cavani",
      PlayerImage:
        "https://resources.premierleague.com/premierleague/photos/players/40x40/p40720.png",
      Team: "Manchester United",
      TeamImage:
        "https://resources.premierleague.com/premierleague/badges/50/t1.png",
      Country: "Uruguay",
      CountryImage:
        "https://www.countryflags.com/wp-content/uploads/uruguay-flag-png-large.png",
      Position: "FWD",
      Goals: 2,
      Apps: 19
    },
    {
      PlayerID: 10,
      PlayerName: "Ben Chilwell",
      PlayerImage:
        "https://resources.premierleague.com/premierleague/photos/players/40x40/p172850.png",
      Team: "Chelsea",
      TeamImage:
        "https://resources.premierleague.com/premierleague/badges/50/t8.png",
      Country: "England",
      "Country Image":
        "https://www.countryflags.com/wp-content/uploads/england-flag-jpg-xl.jpg",
      Position: "DEF",
      Goals: 12,
      Apps: 17
    }
  ];

  const columnGamePerformance = [
    {
      name: "Player ID",
      selector: (row) => row.PlayerID,
      sortable: true
    },
    {
      name: "Player Name",
      selector: (row) => row.PlayerName,
      sortable: true
    },
    {
      name: "Value",
      selector: (row) => row.Value,
      sortable: true
    }
  ];

  const gamePerformance = [
    {
      PlayerID: 1,
      GameID: 1,
      Value: 8
    },
    {
      PlayerID: 1,
      GameID: 2,
      Value: 8
    },
    {
      PlayerID: 1,
      GameID: 3,
      Value: 4
    },
    {
      PlayerID: 1,
      GameID: 4,
      Value: 2
    },
    {
      PlayerID: 1,
      GameID: 5,
      Value: 4
    },
    {
      PlayerID: 1,
      GameID: 6,
      Value: 6
    },
    {
      PlayerID: 1,
      GameID: 7,
      Value: 6
    },
    {
      PlayerID: 1,
      GameID: 8,
      Value: 8
    },
    {
      PlayerID: 1,
      GameID: 9,
      Value: 3
    },
    {
      PlayerID: 1,
      GameID: 10,
      Value: 5
    },
    {
      PlayerID: 2,
      GameID: 1,
      Value: 1
    },
    {
      PlayerID: 2,
      GameID: 2,
      Value: 4
    },
    {
      PlayerID: 2,
      GameID: 3,
      Value: 6
    },
    {
      PlayerID: 2,
      GameID: 4,
      Value: 1
    },
    {
      PlayerID: 2,
      GameID: 5,
      Value: 9
    },
    {
      PlayerID: 2,
      GameID: 6,
      Value: 3
    },
    {
      PlayerID: 2,
      GameID: 7,
      Value: 2
    },
    {
      PlayerID: 2,
      GameID: 8,
      Value: 6
    },
    {
      PlayerID: 2,
      GameID: 9,
      Value: 7
    },
    {
      PlayerID: 2,
      GameID: 10,
      Value: 2
    },
    {
      PlayerID: 3,
      GameID: 1,
      Value: 8
    },
    {
      PlayerID: 3,
      GameID: 2,
      Value: 6
    },
    {
      PlayerID: 3,
      GameID: 3,
      Value: 4
    },
    {
      PlayerID: 3,
      GameID: 4,
      Value: 8
    },
    {
      PlayerID: 3,
      GameID: 5,
      Value: 10
    },
    {
      PlayerID: 3,
      GameID: 6,
      Value: 5
    },
    {
      PlayerID: 3,
      GameID: 7,
      Value: 6
    },
    {
      PlayerID: 3,
      GameID: 8,
      Value: 2
    },
    {
      PlayerID: 3,
      GameID: 9,
      Value: 10
    },
    {
      PlayerID: 3,
      GameID: 10,
      Value: 6
    },
    {
      PlayerID: 4,
      GameID: 1,
      Value: 3
    },
    {
      PlayerID: 4,
      GameID: 2,
      Value: 1
    },
    {
      PlayerID: 4,
      GameID: 3,
      Value: 2
    },
    {
      PlayerID: 4,
      GameID: 4,
      Value: 5
    },
    {
      PlayerID: 4,
      GameID: 5,
      Value: 4
    },
    {
      PlayerID: 4,
      GameID: 6,
      Value: 9
    },
    {
      PlayerID: 4,
      GameID: 7,
      Value: 8
    },
    {
      PlayerID: 4,
      GameID: 8,
      Value: 3
    },
    {
      PlayerID: 4,
      GameID: 9,
      Value: 6
    },
    {
      PlayerID: 4,
      GameID: 10,
      Value: 4
    },
    {
      PlayerID: 5,
      GameID: 1,
      Value: 3
    },
    {
      PlayerID: 5,
      GameID: 2,
      Value: 6
    },
    {
      PlayerID: 5,
      GameID: 3,
      Value: 3
    },
    {
      PlayerID: 5,
      GameID: 4,
      Value: 9
    },
    {
      PlayerID: 5,
      GameID: 5,
      Value: 6
    },
    {
      PlayerID: 5,
      GameID: 6,
      Value: 3
    },
    {
      PlayerID: 5,
      GameID: 7,
      Value: 8
    },
    {
      PlayerID: 5,
      GameID: 8,
      Value: 5
    },
    {
      PlayerID: 5,
      GameID: 9,
      Value: 1
    },
    {
      PlayerID: 5,
      GameID: 10,
      Value: 3
    },
    {
      PlayerID: 6,
      GameID: 1,
      Value: 7
    },
    {
      PlayerID: 6,
      GameID: 2,
      Value: 3
    },
    {
      PlayerID: 6,
      GameID: 3,
      Value: 9
    },
    {
      PlayerID: 6,
      GameID: 4,
      Value: 5
    },
    {
      PlayerID: 6,
      GameID: 5,
      Value: 1
    },
    {
      PlayerID: 6,
      GameID: 6,
      Value: 4
    },
    {
      PlayerID: 6,
      GameID: 7,
      Value: 2
    },
    {
      PlayerID: 6,
      GameID: 8,
      Value: 3
    },
    {
      PlayerID: 6,
      GameID: 9,
      Value: 4
    },
    {
      PlayerID: 6,
      GameID: 10,
      Value: 7
    },
    {
      PlayerID: 7,
      GameID: 1,
      Value: 3
    },
    {
      PlayerID: 7,
      GameID: 2,
      Value: 8
    },
    {
      PlayerID: 7,
      GameID: 3,
      Value: 1
    },
    {
      PlayerID: 7,
      GameID: 4,
      Value: 7
    },
    {
      PlayerID: 7,
      GameID: 5,
      Value: 4
    },
    {
      PlayerID: 7,
      GameID: 6,
      Value: 6
    },
    {
      PlayerID: 7,
      GameID: 7,
      Value: 10
    },
    {
      PlayerID: 7,
      GameID: 8,
      Value: 8
    },
    {
      PlayerID: 7,
      GameID: 9,
      Value: 2
    },
    {
      PlayerID: 7,
      GameID: 10,
      Value: 4
    },
    {
      PlayerID: 8,
      GameID: 1,
      Value: 5
    },
    {
      PlayerID: 8,
      GameID: 2,
      Value: 2
    },
    {
      PlayerID: 8,
      GameID: 3,
      Value: 3
    },
    {
      PlayerID: 8,
      GameID: 4,
      Value: 7
    },
    {
      PlayerID: 8,
      GameID: 5,
      Value: 4
    },
    {
      PlayerID: 8,
      GameID: 6,
      Value: 8
    },
    {
      PlayerID: 8,
      GameID: 7,
      Value: 3
    },
    {
      PlayerID: 8,
      GameID: 8,
      Value: 1
    },
    {
      PlayerID: 8,
      GameID: 9,
      Value: 3
    },
    {
      PlayerID: 8,
      GameID: 10,
      Value: 5
    },
    {
      PlayerID: 9,
      GameID: 1,
      Value: 3
    },
    {
      PlayerID: 9,
      GameID: 2,
      Value: 7
    },
    {
      PlayerID: 9,
      GameID: 3,
      Value: 5
    },
    {
      PlayerID: 9,
      GameID: 4,
      Value: 8
    },
    {
      PlayerID: 9,
      GameID: 5,
      Value: 4
    },
    {
      PlayerID: 9,
      GameID: 6,
      Value: 2
    },
    {
      PlayerID: 9,
      GameID: 7,
      Value: 10
    },
    {
      PlayerID: 9,
      GameID: 8,
      Value: 7
    },
    {
      PlayerID: 9,
      GameID: 9,
      Value: 3
    },
    {
      PlayerID: 9,
      GameID: 10,
      Value: 7
    },
    {
      PlayerID: 10,
      GameID: 1,
      Value: 7
    },
    {
      PlayerID: 10,
      GameID: 2,
      Value: 2
    },
    {
      PlayerID: 10,
      GameID: 3,
      Value: 5
    },
    {
      PlayerID: 10,
      GameID: 4,
      Value: 9
    },
    {
      PlayerID: 10,
      GameID: 5,
      Value: 10
    },
    {
      PlayerID: 10,
      GameID: 6,
      Value: 6
    },
    {
      PlayerID: 10,
      GameID: 7,
      Value: 7
    },
    {
      PlayerID: 10,
      GameID: 8,
      Value: 2
    },
    {
      PlayerID: 10,
      GameID: 9,
      Value: 3
    },
    {
      PlayerID: 10,
      GameID: 10,
      Value: 9
    }
  ];

  const arrNames = [
    { id: 10, name: "A" },
    { id: 11, name: "B" },
    { id: 12, name: "C" },
    { id: 13, name: "A" },
    { id: 14, name: "B" }
  ];

  const arrInfo = [
    { name: "A", info: "AAA" },
    { name: "B", info: "BBB" },
    { name: "C", info: "CCC" }
  ];

  const arrInfoMap = new Map(playerSummary.map((o) => [o.PlayerID, o]));

  const result = gamePerformance.map((o) => ({
    ...o,
    ...arrInfoMap.get(o.PlayerID)
  }));

  const conditionalRowStyles = [
    {
      when: (row) => row,
      style: {
        "&:hover": {
          backgroundColor: "green",
          color: "white",
          cursor: "pointer"
        }
      }
    }
    // You can also pass a callback to style for additional customization
  ];

  const handleRowClicked = (row) => {
    console.log(row.PlayerName);
  };
  return (
    <div className="DataT  ">
      <DataTable
        title="Player Summary"
        columns={columns}
        data={playerSummary}
        defaultSortFieldId
        pagination={5}
        onRowClicked={handleRowClicked}
        highlightOnHover
      />
      
    </div>
  );
}
