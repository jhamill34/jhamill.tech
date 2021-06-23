/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useLayoutEffect } from 'react'
import { jsx } from 'theme-ui'
import { useDimension } from '../hooks/useDimension'

type World = {
  width: number
  height: number
  airDragCoef: number
  rotationalDragCoef: number
  entities: Entity[]
}

type BaseComponent = {
  id: string
  timeAdded: number
}

type WeightComponent = {
  mass: number
}

type ChargedComponent = {
  charge: number
}

type SpringComponent = {
  springConstant: number
}

type AppliedForceComponent = {
  force: {
    x: number
    y: number
  }
}

type RigidBodyComponent = {
  body: {
    radius: number
  }
}

type AppliedTorqueComponent = {
  torque: {
    mag: number
  }
}

type AngularAccelerationComponent = {
  angularAcceleration: {
    mag: number
  }
}

type AngularVelocityComponent = {
  angularVelocity: {
    mag: number
  }
}

type RotationComponent = {
  rotation: {
    radians: number
  }
}

type AccelerationComponent = {
  acceleration: {
    x: number
    y: number
  }
}

type VelocityComponent = {
  velocity: {
    x: number
    y: number
  }
}

type PositionComponent = {
  position: {
    x: number
    y: number
  }
}

type SpriteComponent = {
  sprite: {
    color: HSV
    shape: Shape
  }
}

type RelationComponent = {
  entities: {
    from: BaseComponent & PositionComponent & AppliedForceComponent
    to: BaseComponent & PositionComponent & AppliedForceComponent
  }
}

type HSV = {
  h: number
  s: number
  v: number
  a: number
}

type RGB = {
  r: number
  g: number
  b: number
  a: number
}

function hsvToRgb({ h, s, v, a }: HSV): RGB {
  const i = Math.floor(h * 6)
  const f = h * 6 - i
  const p = v * (1 - s)
  const q = v * (1 - f * s)
  const t = v * (1 - (1 - f) * s)

  let r: number, g: number, b: number

  const result = i % 6
  if (result == 0) {
    r = v
    g = t
    b = p
  } else if (result == 1) {
    r = q
    g = v
    b = p
  } else if (result == 2) {
    r = p
    g = v
    b = t
  } else if (result == 3) {
    r = p
    g = q
    b = v
  } else if (result == 4) {
    r = t
    g = p
    b = v
  } else {
    r = v
    g = p
    b = q
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
    a,
  }
}

type Shape = Circle | Rectangle | Triangle

type Circle = {
  r: number
}

function isCircle(shape: Shape): shape is Circle {
  return (shape as Circle).r !== undefined
}

type Rectangle = {
  width: number
  height: number
}

function isRectangle(shape: Shape): shape is Rectangle {
  return (shape as Rectangle).width !== undefined
}

type Triangle = {
  sideLength: number
}

type ParticleEntity = BaseComponent &
  PositionComponent &
  SpriteComponent &
  VelocityComponent &
  AccelerationComponent &
  AppliedForceComponent &
  ChargedComponent &
  WeightComponent &
  RigidBodyComponent &
  AppliedTorqueComponent &
  AngularAccelerationComponent &
  AngularVelocityComponent &
  RotationComponent

type EdgeEntity = BaseComponent & RelationComponent & SpringComponent

type Entity = ParticleEntity | EdgeEntity
type System = (entity: Entity, world: World) => void
type GlobalSystem = (world: World) => void

function makeid(length: number): string {
  let result = ''
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

function createRandomShape(r: number): Shape {
  const coinFlip = Math.floor(Math.random() * 3)

  if (coinFlip == 0) {
    return {
      r,
    }
  } else if (coinFlip == 1) {
    return {
      width: r * 2,
      height: r * 2,
    }
  } else {
    return {
      sideLength: r * 2,
    }
  }
}

function createParticles(
  n: number,
  width: number,
  height: number
): ParticleEntity[] {
  const result: ParticleEntity[] = []

  for (let i = 0; i < n; i++) {
    result.push({
      id: makeid(10),
      timeAdded: Date.now(),
      force: {
        x: 0,
        y: 0,
      },
      acceleration: {
        x: 0,
        y: 0,
      },
      velocity: {
        x: 0,
        y: 0,
      },
      position: {
        x: Math.random() * width,
        y: Math.random() * height,
      },
      body: {
        radius: 10,
      },
      torque: {
        mag: 0,
      },
      angularAcceleration: {
        mag: 0,
      },
      angularVelocity: {
        mag: 0,
      },
      rotation: {
        radians: 0,
      },
      charge: 2,
      mass: 0.5,
      sprite: {
        color: {
          h: 0.25 * Math.random() + 0.5,
          s: 0.2 * Math.random() + 0.6,
          v: 0.2 * Math.random() + 0.6,
          a: 0.5,
        },
        shape: createRandomShape(10),
      },
    })
  }

  return result
}

function preGenerateParticleSystem(batch: number, max: number): GlobalSystem {
  return function particleSystem(world: World) {
    const lastAddedTime = world.entities
      .map((e) => e.timeAdded)
      .reduce((prev, curr) => {
        if (curr > prev) {
          return curr
        } else {
          return prev
        }
      }, 0)

    const elapsedTime = Date.now() - lastAddedTime

    if (world.entities.length < max && elapsedTime > 200) {
      world.entities = world.entities.concat(
        createParticles(batch, world.width, world.height)
      )
    }
  }
}

function preGenerateEdgesSystem(world: World) {
  const newEntities: Entity[] = []
  const vertexCache: { [key: string]: number } = {}

  world.entities.forEach((untypedSubject) => {
    const positionSubject = untypedSubject as BaseComponent &
      PositionComponent &
      AppliedForceComponent &
      SpriteComponent
    const relationSubject = untypedSubject as RelationComponent

    if (
      positionSubject.position !== undefined &&
      positionSubject.sprite !== undefined &&
      positionSubject.force !== undefined &&
      positionSubject.id !== undefined
    ) {
      if (vertexCache[positionSubject.id] === undefined) {
        vertexCache[positionSubject.id] = 0
      }
      newEntities.push(untypedSubject)

      world.entities.forEach((untypedOther) => {
        const otherSubject = untypedOther as BaseComponent &
          PositionComponent &
          SpriteComponent &
          AppliedForceComponent
        if (
          otherSubject.position !== undefined &&
          otherSubject.sprite !== undefined &&
          otherSubject.force !== undefined &&
          otherSubject.id !== undefined
        ) {
          if (vertexCache[otherSubject.id] === undefined) {
            vertexCache[otherSubject.id] = 0
          }
          const [distance] = calculateDistance(positionSubject, otherSubject)
          if (
            vertexCache[positionSubject.id] < 8 &&
            vertexCache[otherSubject.id] < 8 &&
            distance < 100 &&
            positionSubject.sprite.color.a > 0.25 &&
            otherSubject.sprite.color.a > 0.25
          ) {
            vertexCache[positionSubject.id]++
            vertexCache[otherSubject.id]++
            newEntities.push({
              id: makeid(10),
              timeAdded: Date.now(),
              springConstant: 0.00003,
              entities: {
                from: positionSubject,
                to: otherSubject,
              },
            })
          }
        }
      })
    } else if (relationSubject.entities !== undefined) {
      const [distance] = calculateDistance(
        relationSubject.entities.from,
        relationSubject.entities.to
      )

      if (
        vertexCache[relationSubject.entities.from.id] < 8 &&
        vertexCache[relationSubject.entities.to.id] < 8 &&
        distance < 100
      ) {
        newEntities.push(untypedSubject)
      }
    } else {
      newEntities.push(untypedSubject)
    }
  })

  world.entities = newEntities
}

function postRemoveOutOfBoundsSystem(world: World) {
  const inBoundEntities: Entity[] = []

  world.entities.forEach((u) => {
    const e = u as PositionComponent

    if (
      e.position !== undefined &&
      e.position.x > 0 &&
      e.position.x < world.width &&
      e.position.y > 0 &&
      e.position.y < world.height
    ) {
      inBoundEntities.push(e as Entity)
    }
  })

  world.entities = inBoundEntities
}

function preDisplaySystemFactory(ctx: CanvasRenderingContext2D): GlobalSystem {
  return function displaySystem(world: World) {
    ctx.clearRect(0, 0, world.width, world.height)
  }
}

function displayEntitySystemFactory(ctx: CanvasRenderingContext2D): System {
  return function displaySystem(untypedEntity: Entity) {
    const entity = untypedEntity as PositionComponent &
      RotationComponent &
      SpriteComponent
    if (
      entity.position !== undefined &&
      entity.sprite !== undefined &&
      entity.rotation !== undefined
    ) {
      const { color } = entity.sprite
      const { r, g, b, a } = hsvToRgb(color)

      ctx.save()
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`

      ctx.translate(entity.position.x, entity.position.y)
      ctx.rotate(entity.rotation.radians)
      ctx.beginPath()

      // TODO: Rotate based on velocity
      if (isCircle(entity.sprite.shape)) {
        ctx.arc(0, 0, entity.sprite.shape.r, 0, 2 * Math.PI)
      } else if (isRectangle(entity.sprite.shape)) {
        ctx.rect(
          -entity.sprite.shape.width / 2,
          -entity.sprite.shape.height / 2,
          entity.sprite.shape.width,
          entity.sprite.shape.height
        )
      } else {
        const width = entity.sprite.shape.sideLength
        const height = Math.sqrt(Math.pow(width, 2) - Math.pow(width / 2, 2))

        ctx.moveTo(-width / 2, -height / 2)
        ctx.lineTo(width / 2, -height / 2)
        ctx.lineTo(0, height / 2)
      }

      ctx.fill()
      ctx.restore()
    }
  }
}

function displayEdgeEntitySystemFactory(ctx: CanvasRenderingContext2D): System {
  return function displaySystem(untypedEntity: Entity) {
    const relation = untypedEntity as RelationComponent
    if (relation.entities !== undefined) {
      ctx.strokeStyle = 'rgba(100, 100, 100, 0.25)'
      ctx.beginPath()
      ctx.moveTo(
        relation.entities.from.position.x,
        relation.entities.from.position.y
      )
      ctx.lineTo(
        relation.entities.to.position.x,
        relation.entities.to.position.y
      )
      ctx.stroke()
    }
  }
}

function calculateDistance(
  a: PositionComponent,
  b: PositionComponent
): [number, number, number] {
  const dx = a.position.x - b.position.x
  const dy = a.position.y - b.position.y
  return [Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2)), dx, dy]
}

function resetAppliedForce(untypedEntity: Entity) {
  const entity = untypedEntity as AppliedForceComponent & AppliedTorqueComponent
  if (entity.force === undefined || entity.torque === undefined) {
    return
  }

  entity.torque.mag = 0
  entity.force = {
    x: 0,
    y: 0,
  }
}

function calculateTorqueFromForce(untypedEntity: Entity) {
  const entity = untypedEntity as AppliedForceComponent &
    AppliedTorqueComponent &
    VelocityComponent &
    RigidBodyComponent
  if (
    entity.force === undefined ||
    entity.velocity === undefined ||
    entity.torque === undefined ||
    entity.body.radius === undefined
  ) {
    return
  }

  const velocityMag = Math.sqrt(
    Math.pow(entity.velocity.x, 2) + Math.pow(entity.velocity.y, 2)
  )
  const radiusX = (entity.body.radius * entity.velocity.x) / velocityMag
  const radiusY = (entity.body.radius * entity.velocity.y) / velocityMag

  entity.torque.mag = radiusX * entity.force.y - radiusY * entity.force.x
}

function calculateForceFromCharge(untypedEntity: Entity, world: World) {
  const entity = untypedEntity as AppliedForceComponent &
    PositionComponent &
    ChargedComponent

  if (
    entity.force === undefined ||
    entity.position === undefined ||
    entity.charge === undefined
  ) {
    return
  }

  world.entities.forEach((otherUntyped) => {
    const other = otherUntyped as PositionComponent & ChargedComponent
    if (
      other.position !== undefined &&
      other.charge !== undefined &&
      other !== entity
    ) {
      const totalCharge = entity.charge * other.charge
      const [distance, dx, dy] = calculateDistance(entity, other)

      entity.force.x += (totalCharge / Math.pow(distance, 3)) * dx
      entity.force.y += (totalCharge / Math.pow(distance, 3)) * dy
    }
  })
}

function calculateAngularDrag(untypedEntity: Entity, world: World) {
  const entity = untypedEntity as AppliedTorqueComponent &
    AngularVelocityComponent
  if (entity.torque === undefined || entity.angularVelocity === undefined) {
    return
  }

  const dragMag =
    -0.5 * Math.pow(entity.angularVelocity.mag, 2) * world.rotationalDragCoef

  entity.torque.mag += dragMag
}

function calculateForceFromDrag(untypedEntity: Entity, world: World) {
  const entity = untypedEntity as AppliedForceComponent & VelocityComponent
  if (entity.force === undefined || entity.velocity === undefined) {
    return
  }

  const velocityMag = Math.sqrt(
    Math.pow(entity.velocity.x, 2) + Math.pow(entity.velocity.y, 2)
  )
  const dragMag = -0.5 * velocityMag * world.airDragCoef

  entity.force.x += dragMag * entity.velocity.x
  entity.force.y += dragMag * entity.velocity.y
}

function calculateSpringForce(untypedEntity: Entity) {
  const entity = untypedEntity as RelationComponent & SpringComponent
  if (entity.entities === undefined || entity.springConstant === undefined) {
    return
  }

  const result = calculateDistance(entity.entities.from, entity.entities.to)
  entity.entities.from.force.x -= entity.springConstant * result[1]
  entity.entities.from.force.y -= entity.springConstant * result[2]

  entity.entities.to.force.x += entity.springConstant * result[1]
  entity.entities.to.force.y += entity.springConstant * result[2]
}

function calculateAngularAcceleration(untypedEntity: Entity) {
  const entity = untypedEntity as AngularAccelerationComponent &
    RigidBodyComponent &
    WeightComponent &
    AppliedTorqueComponent

  if (
    entity.angularAcceleration === undefined ||
    entity.mass === undefined ||
    entity.torque === undefined ||
    entity.body === undefined
  ) {
    return
  }

  entity.angularAcceleration.mag =
    entity.torque.mag / (entity.mass * Math.pow(entity.body.radius, 2))
}

function calculateAcceleration(untypedEntity: Entity) {
  const entity = untypedEntity as AccelerationComponent &
    WeightComponent &
    AppliedForceComponent

  if (
    entity.acceleration === undefined ||
    entity.mass === undefined ||
    entity.force === undefined
  ) {
    return
  }

  entity.acceleration.x = entity.force.x / entity.mass
  entity.acceleration.y = entity.force.y / entity.mass
}

function calculateAngularVelocity(untypedEntity: Entity) {
  const entity = untypedEntity as AngularVelocityComponent &
    AngularAccelerationComponent
  if (
    entity.angularVelocity === undefined ||
    entity.angularAcceleration === undefined
  ) {
    return
  }

  entity.angularVelocity.mag += entity.angularAcceleration.mag
}

function calculateVelocity(untypedEntity: Entity) {
  const entity = untypedEntity as VelocityComponent & AccelerationComponent
  if (entity.velocity === undefined || entity.acceleration === undefined) {
    return
  }

  entity.velocity.x += entity.acceleration.x
  entity.velocity.y += entity.acceleration.y
}

function rotateSystem(untypedEntity: Entity) {
  const entity = untypedEntity as RotationComponent & AngularVelocityComponent
  if (entity.rotation === undefined || entity.angularVelocity === undefined) {
    return
  }

  entity.rotation.radians += entity.angularVelocity.mag
}

function moveSystem(untypedEntity: Entity) {
  const entity = untypedEntity as PositionComponent & VelocityComponent
  if (entity.position === undefined || entity.velocity === undefined) {
    return
  }

  entity.position.x += entity.velocity.x
  entity.position.y += entity.velocity.y
}

function fadeInSystem(untypedEntity: Entity, world: World) {
  const entity = untypedEntity as SpriteComponent &
    BaseComponent &
    PositionComponent

  if (entity.sprite === undefined || entity.position === undefined) {
    return
  }

  const elapsedTime = Date.now() - entity.timeAdded
  const ellipseX =
    Math.pow(entity.position.x - world.width / 2, 2) /
    Math.pow(world.width / 3, 2)

  const ellipseY =
    Math.pow(entity.position.y - world.height / 2, 2) /
    Math.pow(world.height / 3, 2)

  let ellipse = ellipseX + ellipseY
  if (ellipse > 1) {
    ellipse = 2.0 - ellipse
  }

  if (elapsedTime < 2000) {
    entity.sprite.color.a = (ellipse / 2000) * elapsedTime
  } else {
    entity.sprite.color.a = ellipse
  }
}

function growParticleSystem(untypedEntity: Entity) {
  const entity = untypedEntity as SpriteComponent & BaseComponent
  if (entity.sprite === undefined || entity.timeAdded === undefined) {
    return
  }

  const elapsedTime = Date.now() - entity.timeAdded

  if (isCircle(entity.sprite.shape)) {
    entity.sprite.shape.r =
      4 * Math.sin(((2 * Math.PI) / 5000) * elapsedTime) + 6
  } else if (isRectangle(entity.sprite.shape)) {
    entity.sprite.shape.width =
      8 * Math.sin(((2 * Math.PI) / 5000) * elapsedTime) + 12
    entity.sprite.shape.height =
      8 * Math.sin(((2 * Math.PI) / 5000) * elapsedTime) + 12
  } else {
    entity.sprite.shape.sideLength =
      8 * Math.sin(((2 * Math.PI) / 5000) * elapsedTime) + 12
  }
}

type ManagerConfig = {
  world: World
  preSystems: GlobalSystem[]
  systemRegistry: System[]
  postSystems: GlobalSystem[]
}

class Manager {
  private preSystems: GlobalSystem[]
  private systemRegistry: System[]
  private postSystem: GlobalSystem[]
  private world: World

  constructor(cfg: ManagerConfig) {
    this.world = cfg.world
    this.systemRegistry = cfg.systemRegistry || []
    this.preSystems = cfg.preSystems || []
    this.postSystem = cfg.postSystems || []
  }

  tick() {
    this.preSystems.forEach((s) => s(this.world))
    this.systemRegistry.forEach((s) => {
      this.world.entities.forEach((e) => {
        s(e, this.world)
      })
    })
    this.postSystem.forEach((s) => s(this.world))
  }
}

class Runner {
  private animationFrameId: number | undefined
  private manager: Manager

  constructor(manager: Manager) {
    this.manager = manager
  }

  start() {
    this.manager.tick()
    this.animationFrameId = window.requestAnimationFrame(this.start.bind(this))
  }

  stop() {
    if (this.animationFrameId !== undefined) {
      window.cancelAnimationFrame(this.animationFrameId)
    }
  }
}

export function NetworkAnimation(): React.ReactElement {
  const [width, height, node, canvasRef] = useDimension<HTMLCanvasElement>()

  useLayoutEffect(() => {
    if (node === null) {
      return
    }

    const ctx = node.getContext('2d')
    if (ctx === null) {
      return
    }

    const manager = new Manager({
      world: {
        width,
        height,
        airDragCoef: 0.1,
        rotationalDragCoef: 0.1,
        entities: [],
      },
      preSystems: [
        preGenerateParticleSystem(2, 100),
        preGenerateEdgesSystem,
        // preGenerateStationaryCharges, // <- Special because won't be drawn and doesn't move
        preDisplaySystemFactory(ctx),
      ],
      systemRegistry: [
        resetAppliedForce,
        calculateForceFromCharge,
        calculateForceFromDrag,
        calculateSpringForce,
        calculateAcceleration,
        calculateVelocity,
        calculateTorqueFromForce,
        calculateAngularDrag,
        calculateAngularAcceleration,
        calculateAngularVelocity,
        rotateSystem,
        moveSystem,
        fadeInSystem,
        growParticleSystem,
        displayEdgeEntitySystemFactory(ctx),
        displayEntitySystemFactory(ctx),
      ],
      postSystems: [postRemoveOutOfBoundsSystem],
    })

    const runner = new Runner(manager)
    runner.start()

    return () => {
      runner.stop()
    }
  }, [node, width, height])

  return (
    <canvas
      height={height}
      ref={canvasRef}
      sx={{ width: '100%', height: '100%', backgroundColor: 'background' }}
      width={width}
    />
  )
}
