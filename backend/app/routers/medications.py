from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import MedicationEvent, User
from ..schemas import MedicationEventCreate, MedicationEventResponse
from ..auth import get_current_user

router = APIRouter(prefix="/api/medications", tags=["medications"])

@router.get("/", response_model=list[MedicationEventResponse])
async def get_medications(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return db.query(MedicationEvent).filter(
        MedicationEvent.user_id == current_user.id
    ).all()

@router.post("/", response_model=MedicationEventResponse)
async def create_medication(
    event: MedicationEventCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    db_event = MedicationEvent(**event.dict(), user_id=current_user.id)
    db.add(db_event)
    db.commit()
    db.refresh(db_event)
    return db_event

@router.delete("/{event_id}")
async def delete_medication(
    event_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    event = db.query(MedicationEvent).filter(
        MedicationEvent.id == event_id,
        MedicationEvent.user_id == current_user.id
    ).first()
    
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    
    db.delete(event)
    db.commit()
    return {"status": "success"}