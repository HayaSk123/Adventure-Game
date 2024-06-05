#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

// Creating a class for the hero
class Hero {
  name: string;
  health = 100;

  constructor(name: string) {
    this.name = name;
  }
}

// Creating a class for the opponent
class Opponent {
  name: string;
  health = 100;

  constructor(name: string) {
    this.name = name;
  }
}

async function main() {
    console.log(chalk.magentaBright.bold("\t \tWelcome to Haya Sikander's Adventure Game"))
    console.log("-".repeat(73))
    const hero = await inquirer.prompt([
        {
          name: "heroName",
          type: "input",
          message: "Enter the name of your Hero: ",
        },
      ]);
      
      const enemy = await inquirer.prompt([
        {
          name: "opponentName",
          type: "list",
          message: "Choose your Opponent",
          choices: ["Skeleton", "Witch", "Zombie", "Dragon", "Giant"],
        },
      ]);
      
      const heroInfo = new Hero(hero.heroName);
      const opponentInfo = new Opponent(enemy.opponentName);
  console.log(
    chalk.magentaBright(
      `\t \t ${heroInfo.name.toUpperCase()} v/s ${opponentInfo.name.toUpperCase()}`
    )
  );
  console.log("-".repeat(50));

  while (heroInfo.health > 0 && opponentInfo.health > 0) {
    const action = await inquirer.prompt([
      {
        name: "Action",
        type: "list",
        message: "What would you like to do?",
        choices: ["Attack", "Defend", "Heal"],
      },
    ]);

    switch (action.Action) {
      case "Attack":
        let oppDamage: number = Math.floor(Math.random() * 35 + 1); // Generates a random number between 1 and 35
        let heroDamage: number = Math.floor(Math.random() * 35 + 1); // Generates a random number between 1 and 35
        let choice = Math.floor(Math.random() * 3 + 1); // Generates a random number between 1 and 3
        if (choice == 1) {
          console.log(chalk.yellowBright(`You attacked and ${opponentInfo.name} defended`));
        } else if (choice == 2) {
          console.log(chalk.greenBright(`You attacked and ${opponentInfo.name} took damage`));
          opponentInfo.health -= oppDamage;
        } else if (choice == 3) {
          console.log(chalk.redBright(`You attacked and ${opponentInfo.name} attacked back`));
          opponentInfo.health -= oppDamage;
          heroInfo.health -= heroDamage;
        }
        break;
      case "Defend":
        console.log(chalk.yellowBright(`${opponentInfo.name} attacked and you defended`));
        break;
      case "Heal":
        let oppDamage2: number = Math.floor(Math.random() * 35 + 1); // Generates a random number between 1 and 35
        let heroDamage2: number = Math.floor(Math.random() * 35 + 1); // Generates a random number between 1 and 35
        let choice2 = Math.floor(Math.random() * 2 + 1); // Generates a random number either 1 or 2
        if (choice2 == 1) {
          console.log(chalk.greenBright("You healed successfully"));
          heroInfo.health = 100;
        } else if (choice2 == 2) {
          console.log(chalk.redBright("You were attacked by the enemy while healing"));
          heroInfo.health -= heroDamage2;
        }
        break;
    }

    // Print health after each turn
    console.log(chalk.blueBright(`Your Health       : ${heroInfo.health}`));
    console.log(chalk.blueBright(`Opponent's Health : ${opponentInfo.health}`));
    console.log("-".repeat(50));

    // Check for end of game
    if (heroInfo.health <= 0) {
      console.log(chalk.redBright(`You were defeated by ${opponentInfo.name}`));
      break;
    } else if (opponentInfo.health <= 0) {
      console.log(chalk.greenBright(`Congratulations! You defeated the ${opponentInfo.name}`));
      break;
    }
  }
}

main();
