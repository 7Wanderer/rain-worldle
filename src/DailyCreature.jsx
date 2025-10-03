import { useState, useEffect } from "react";
import { logoTextStyle, flexHeader, basicTextStyle, basicTextStyleBold, flexFeat } from './styles';
import './styles.css'
import data from './bestiarysorted.json';


function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  a.sort();
  b.sort();

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}
function arraysClose(a, b) {
  a.sort();
  b.sort();

  for (var i = 0; i < a.length; ++i) {
    for (var j = 0; j < b.length; ++j) {
      if (a[i] == b[j]) return true;
    }
  }
  return false;
}

function getDailyAnswerIndex(listLength, date = new Date()) {
  const dateStr = date.toISOString().split('T')[0]; // e.g., '2025-10-01'
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = (hash << 5) - hash + dateStr.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash) % listLength;
}

export const DailyCreature = () => {

  const options = data.map((creature) => creature.Creature)
  const [guesses, setGuesses] = useState([]);
  const correctAnswer = data[getDailyAnswerIndex(64, new Date())];
  const [input, setInput] = useState('');

  const [showDropdown, setShowDropdown] = useState(false);

  const [disabled, setDisabled] = useState(false);

  const filteredOptions = options.filter((item) =>
    item.toLowerCase().includes(input.toLowerCase())
  );

  const checkGuess = (guess) => {
    setGuesses([guess, ...guesses]);
    if (guess == correctAnswer) return;
    setDisabled(false);
  }

  const getLocations = (location) => {
    var temp = ""
    location.forEach((item) => {
      switch (item) {
        case "JE":
          temp = temp + "Journey's End";
          break;
        case "SL":
          temp = temp + "Shoreline";
          break;
        case "DS":
          temp = temp + "Drainage System";
          break;
        case "ST":
          temp = temp + "Subterranean";
          break;
        case "SC":
          temp = temp + "Shaded Citadel";
          break;
        case "SI":
          temp = temp + "Sky Islands";
          break;
        case "TW":
          temp = temp + "The Wall";
          break;
        case "OS":
          temp = temp + "Outskirts";
          break;
        case "IC":
          temp = temp + "Industrial Complex";
          break;
        case "UH":
          temp = temp + "Underhang"
          break;
        case "LTTM":
          temp = temp + "Looks to the Moon"
          break;
        case "OE":
          temp = temp + "Outer Expanse"
          break;
        case "GW":
          temp = temp + "Garbage Wastes"
          break;
        case "SS":
          temp = temp + "Submerged Superstructure"
          break;
        case "TE":
          temp = temp + "The Exterior"
          break;
        case "CC":
          temp = temp + "Chimney Canopy"
          break;
        case "PY":
          temp = temp + "Pipeyard"
          break;
        case "FP":
          temp = temp + "Five Pebbles"
          break;
        case "MC":
          temp = temp + "Memory Crypts"
          break;
        case "M":
          temp = temp + "Metropolis"
          break;
        case "RB":
          temp = temp + "Rubicon"
          break;
        case "D":
          temp = temp + "Depths"
          break;
        case "FA":
          temp = temp + "Farm Arrays"
          break;
        default:
          temp = location[0];
          break;
      }
      temp = temp + "\n";
    }); {/* LET ME OUT LET ME OUT LET ME OUT LET ME OUT */}
    return temp;
  }

  const getCampaignIcon = (campaign) => {
    switch(campaign) {
      case "Violent":
        return "/icons/violent.png";
        break;
      case "Monk":
        return "/icons/Monk.webp";
        break;
      case "Survivor":
        return "/icons/Survivor.webp";
        break;
      case "Hunter":
        return "/icons/Hunter.webp";
        break;
      case "Gourmand":
        return "/icons/Gourmand.webp";
        break;
      case "Artificer":
        return "/icons/Artificer.webp";
        break;
      case "Rivulet":
        return "/icons/Rivulet.webp";
        break;
      case "Spearmaster":
        return "/icons/Spearmaster.webp";
        break;
      case "Saint":
        return "/icons/Saint.webp";
        break;        
      case "Inv":
        return "/icons/Inv.webp";
        break;
      case "All":
        return "/icons/all.png";
        break;
      default:
        return;
        break;
    }
  }

  const displayArrow = (health) => {
    if (health > parseFloat(correctAnswer.Health)) return "⬇️";
    else if (health < parseFloat(correctAnswer.Health)) return "⬆️";
    else return;
  }

  const displayHealth = (health) => {
    if (health == 987654321) return "N/A"; else return health;
  }

  const determineColour = (attribute, attributeName) => {
    switch (attributeName) {
      case "Hostility":
        if (attribute == correctAnswer.Hostility) return 'green'; else return 'red';
        break;
      case "Mobility":
        if (attribute == correctAnswer.Mobility) return 'green'; 
        else if (correctAnswer.Mobility == "Climbs walls" && attribute == "Climbs poles") return 'yellow';
        else return 'red';
        break;
      case "Introduced":
        if (attribute == correctAnswer.Introduced) return 'green'; else return 'red';
        break;
      case "Health":
        if (attribute == correctAnswer.Health) return 'green'; else return 'red';
        break;
      case "Colour":
        if (arraysEqual(attribute.split(", "), correctAnswer.Colour.split(", ")))
          return 'green';
        else if (arraysClose(attribute.split(", "), correctAnswer.Colour.split(", ")))
          return 'yellow';
        else return 'red';
        break;
      case "Campaign":
        if (arraysEqual(attribute.split(", "), correctAnswer.Campaign.split(", ")))
          return 'green';
        else if (arraysClose(attribute.split(", "), correctAnswer.Campaign.split(", ")))
          return 'yellow';
        else return 'red';
        break;
        break;
      case "Location":
        if (arraysEqual(attribute.split(", "), correctAnswer.Location.split(", ")))
          return 'green';
        else if (arraysClose(attribute.split(", "), correctAnswer.Location.split(", ")))
          return 'yellow';
        else return 'red';
        break;
      default:
        if (attribute == correctAnswer.Creature) return 'green'; else return 'grey';
        break;
    }
  }

  return (


    <div className="Game">
        <h1 style={logoTextStyle}>Rain Worldle</h1> {/* TODO: Make a style for this using the Rodondo (Rain World) font. */}
        <div style={{
        backgroundColor: 'rgba(33, 32, 32, 0.2)',
        borderColor: 'rgba(33, 32, 32, 0.2)',
        border: '2px',
        borderRadius: '5px',
        backdropFilter: 'blur(6px)'
      }}>
        <p style={basicTextStyle}>Guess the creature! Resets at Midnight (UTC+0).</p>
      </div>
      {/* Autofillable text box goes here! */}
      
      <form>
      <input
        type="text"
        input={input}
        onChange={(e) => {
          setInput(e.target.value);
          setShowDropdown(true);
        }}
        disabled = {disabled}
        
      />
      {/* Custom dropdown */}
      {showDropdown &&
        input.trim() !== '' &&
        filteredOptions.length > 0 &&
        !disabled &&
        (
          <ul className='dropdown'>
            {filteredOptions.slice(0, 10).map((item) => (
              <li
                key={item}
                className="dropdown-item"
                onClick={() => {
                  setDisabled(true);
                  checkGuess(data.find((element) => element.Creature == item));
                  setInput('');
                }}>
                {item}
              </li>
            ))}
          </ul>
        )}
    </form>

        <div style={{
            display: 'flex',
            flexDirection: 'row',
            marginTop: 5,
            marginBottom: 5,
            justifyContent: 'center',
            borderBottom: '2px solid white',
            minHeight: 50,
            minWidth: '40vw',
            maxWidth: '150vw',
          }}>
            <div style={flexHeader(1.2)}>
              <p style={basicTextStyleBold}>
                Creature
              </p>
            </div>
            <div style={flexHeader(0.8)}>
              <p style={basicTextStyleBold}>
                Hostility
              </p>
            </div>
            <div style={flexHeader(1.5)}>
              <p style={basicTextStyleBold}>
                Mobility
              </p>
            </div>
            <div style={flexHeader(1)}>
              <p style={basicTextStyleBold}>
                DLC
              </p>
            </div>
            <div style={flexHeader(0.9)}>
              <p style={basicTextStyleBold}>
                Health
              </p>
            </div>
            <div style={flexHeader(1)}>
              <p style={basicTextStyleBold}>
                Colour
              </p>
            </div>
            <div style={flexHeader(1.5)}>
              <p style={basicTextStyleBold}>
                Campaign(s)
              </p>
            </div>
            <div style={flexHeader(2)}>
              <p style={basicTextStyleBold}>
                Location(s)
              </p>
            </div>
        </div> {/* Header */}

        {/* Listed guesses */}
        {guesses.map((creature) => (
          <div style={{
              display: 'flex',
              flexDirection: 'row',
              marginTop: 5,
              marginBottom: 5,
              justifyContent: 'center',
              borderBottom: '2px solid white',
              minHeight: 50,
              minWidth: '40vw',
              maxWidth: '150vw',
            }}>
              
              <div style={flexFeat(1.2, 
                determineColour(creature.Creature, "Creature")
                )}>
                <p style={basicTextStyleBold}>
                  <img src={"/icons/"+creature.ID+".webp"} height="40px" />
                </p>
              </div>
              <div style={flexFeat(0.8, 
                determineColour(creature.Hostility, "Hostility"))}>
                <p style={basicTextStyleBold}>
                  {creature.Hostility}
                </p>
              </div>
              <div style={flexFeat(1.5, 
                determineColour(creature.Mobility, "Mobility"))}>
                <p style={basicTextStyleBold}>
                  {creature.Mobility}
                </p>
              </div>
              <div style={flexFeat(1,
                determineColour(creature.Introduced, "Introduced"))}>
                <p style={basicTextStyleBold}>
                  {creature.Introduced}
                </p>
              </div>
              <div style={flexFeat(0.9,
                determineColour(creature.Health, "Health"))}>
                <p style={basicTextStyleBold}>
                  {displayHealth(creature.Health)}
                  {displayArrow(parseFloat(creature.Health))}
                </p>
              </div>
              <div style={flexFeat(1,
                determineColour(creature.Colour, "Colour"))}>
                <p style={basicTextStyleBold}>
                  {creature.Colour}
                </p>
              </div>
              <div style={flexFeat(1.5,
                determineColour(creature.Campaign, "Campaign"))}>
                <img src={getCampaignIcon(creature.Campaign.split(", ")[0])} />
                <img src={getCampaignIcon(creature.Campaign.split(", ")[1])} />
                <img src={getCampaignIcon(creature.Campaign.split(", ")[2])} />
                <img src={getCampaignIcon(creature.Campaign.split(", ")[3])} />
              </div> {/* Eventually change this to a foreach campaign in creature.Campaign to split up each campaign and handle them individually */}
              <div style={flexFeat(2, 
                determineColour(creature.Location, "Location"))}>
                <p style={basicTextStyleBold}>
                  {getLocations(creature.Location.split(", "))}
                </p>
              </div>   {/* Same here */}
          </div>
        ))}
        
    </div>
  );
}