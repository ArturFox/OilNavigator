import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { useEffect, useRef, useState } from "react";
import type { BrigadesDto } from "../../api/brigades/brigades.dto";
import type { PersonsDto } from "../../api/persons/persons.dto";

interface PersonCartProps {
  personsMapProps: Map<string, PersonsDto[]>;
  brigadesMapProps: Map<string, BrigadesDto>;
}

const ITEM_TYPE = "PERSON";

function PersonCard({ person }: { person: PersonsDto }) {
  const ref = useRef<HTMLDivElement | null>(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ITEM_TYPE,
    item: { id: person.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  useEffect(() => {
    if (ref.current) {
      drag(ref);
    }
  }, [drag]);

  return (
    <div
      ref={ref}
      style={{
        padding: "8px 12px",
        borderRadius: "8px",
        border: "1px solid #ddd",
        opacity: isDragging ? 0.5 : 1,
        cursor: "grab",
      }}
    >
      {person.name}
    </div>
  );
}

interface DropZoneProps {
  brigadeId: string;
  children: React.ReactNode;
  onDrop: (personId: string, toBrigade: string) => void;
}

function DropZone({ brigadeId, children, onDrop }: DropZoneProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  const [, drop] = useDrop(() => ({
    accept: ITEM_TYPE,
    drop: (item: { id: string }) => onDrop(item.id, brigadeId),
  }));

  useEffect(() => {
    if (ref.current) {
      drop(ref);
    }
  }, [drop]);

  return (
    <section
      ref={ref}
      style={{
        border: "1px solid #ccc",
        borderRadius: "12px",
        padding: "12px",
      }}
    >
      {children}
    </section>
  );
}

export function PersonCart({ personsMapProps, brigadesMapProps }: PersonCartProps) {
  const [personsMap, setPersonsMap] = useState(new Map(personsMapProps));

  const handleDrop = (personId: string, toBrigadeId: string) => {
    let fromBrigadeId: string | null = null;
    let person: PersonsDto | null = null;

    for (const [brigadeId, people] of personsMap.entries()) {
      const found = people.find((p) => p.id === personId);
      if (found) {
        fromBrigadeId = brigadeId;
        person = found;
        break;
      }
    }

    if (!fromBrigadeId || !person) return;

    const newMap = new Map(personsMap);

    newMap.set(
      fromBrigadeId,
      newMap.get(fromBrigadeId)!.filter((p) => p.id !== personId)
    );

    const target = newMap.get(toBrigadeId) ?? [];
    newMap.set(toBrigadeId, [...target, person]);

    setPersonsMap(newMap);
  };

  const isTouch = "ontouchstart" in window;

  return (
    <DndProvider backend={isTouch ? TouchBackend : HTML5Backend}>
      <main
        style={{
          padding: "16px",
          display: "grid",
          gap: "16px",
        }}
      >
        {Array.from(brigadesMapProps.values()).map((b) => (
          <DropZone key={b.id} brigadeId={b.id} onDrop={handleDrop}>
            <h4 style={{ margin: "0 0 8px", fontSize: "18px" }}>{b.name}</h4>
            <article style={{ display: "grid", gap: "6px" }}>
              {personsMap.get(b.id)?.map((p) => (
                <PersonCard key={p.id} person={p} />
              ))}
            </article>
          </DropZone>
        ))}

        <DropZone brigadeId="no_brigade" onDrop={handleDrop}>
          <h4 style={{ margin: "0 0 8px", fontSize: "18px" }}>Без бригады</h4>
          <article style={{ display: "grid", gap: "6px" }}>
            {personsMap.get("no_brigade")?.map((p) => (
              <PersonCard key={p.id} person={p} />
            ))}
          </article>
        </DropZone>
      </main>
    </DndProvider>
  );
}