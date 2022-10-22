# Auto-Dungeon

Dungeon Generator for DJFoxy's New Game

## Functionality

- randomizes the room id of mobs & traps (entities)
- randomizes the location of these entities WITHIN the rooms
- picks a random final boss
- generates game metadata in json format
- picks a random map layout
- takes this data to create a map image

## Sample Output

[![Watch it in action!](https://avatars.githubusercontent.com/u/4052902?s=200&v=4)](https://www.youtube.com/watch?v=fhpD9ZEAhnk)

### Resulting Map Image

!["Sample Map Output"](https://github.com/ctnava/autodungeon/blob/main/blob/map.png)

### Raw Game Data

```json
{
  "data": [
    {
      "description": "entrance",
      "mobs": [
        "players"
      ],
      "traps": []
    },
    {
      "description": "hallways",
      "mobs": [],
      "traps": [
        "lTurret"
      ]
    },
    {
      "description": "hallways",
      "mobs": [
        "goblin"
      ],
      "traps": [
        "boulder"
      ]
    },
    {
      "description": "hallways",
      "mobs": [],
      "traps": []
    },
    {
      "description": "hallways",
      "mobs": [
        "golem"
      ],
      "traps": []
    },
    {
      "description": "hallways",
      "mobs": [],
      "traps": []
    },
    {
      "description": "hallways",
      "mobs": [
        "zombie"
      ],
      "traps": [
        "acidPit"
      ]
    },
    {
      "description": "bossRoom",
      "mobs": [
        "mummyWizard"
      ],
      "traps": []
    }
  ]
}
```
